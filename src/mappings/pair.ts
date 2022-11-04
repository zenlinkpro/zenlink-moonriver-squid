import { CommonHandlerContext, EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big as BigDecimal } from 'big.js'
import * as pairAbi from '../abis/pair'
import { ADDRESS_ZERO, ZERO_BD } from "../consts";
import { getPair } from "../entities/pair";
import { getBundle, getFactory, getPosition, getTransaction } from "../entities/utils";
import {
  Bundle,
  Burn,
  LiquidityPosition,
  LiquidityPositionSnapshot,
  Mint,
  Pair,
  Swap,
  Token,
  Transaction,
  User
} from "../model";
import { convertTokenToDecimal, createLiquidityPosition } from "../utils/helpers";
import { findEthPerToken, getEthPriceInUSD, MINIMUM_USD_THRESHOLD_NEW_PAIRS, WHITELIST } from "../utils/pricing";
import { 
  updatePairDayData, 
  updatePairHourData, 
  updateTokenDayData, 
  updateFactoryDayData, 
  updateZenlinkInfo 
} from "../utils/updates";

const transferEventAbi = pairAbi.events['Transfer(address,address,uint256)']
const syncEventAbi = pairAbi.events['Sync(uint112,uint112)']
const SwapAbi = pairAbi.events['Swap(address,uint256,uint256,uint256,uint256,address)']
const MintAbi = pairAbi.events['Mint(address,uint256,uint256)']
const BurnAbi = pairAbi.events['Burn(address,uint256,uint256,address)']

async function isCompleteMint(ctx: CommonHandlerContext<Store>, mintId: string): Promise<boolean> {
  return !!(await ctx.store.get(Mint, { where: { id: mintId } }))?.sender // sufficient checks
}

export async function handleTransfer(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address

  const data = transferEventAbi.decode(evmLogArgs)
  // ignore initial transfers for first adds
  if (data.to === ADDRESS_ZERO && data.value.toBigInt() === 1000n) {
    return
  }
  const transactionHash = ctx.event.evmTxHash

  // user stats
  let { from, to } = data
  from = from.toLowerCase()
  to = to.toLowerCase()

  // get pair and load contract
  const pair = await getPair(ctx, contractAddress)
  if (!pair) return

  // liquidity token amount being transfered
  const value = convertTokenToDecimal(data.value.toBigInt(), 18)

  // get or create transaction
  let transaction = await getTransaction(ctx, ctx.event.evmTxHash)
  if (!transaction) {
    transaction = new Transaction({
      id: transactionHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp),
      mints: [],
      burns: [],
      swaps: [],
    })
    await ctx.store.save(transaction)
  }

  const { mints } = transaction

  // mints
  if (from === ADDRESS_ZERO) {
    pair.totalSupply = BigDecimal(pair.totalSupply).plus(value).toFixed(6)

    if (!mints.length || await isCompleteMint(ctx, mints[mints.length - 1])) {
      const mint = new Mint({
        id: `${transactionHash}-${mints.length}`,
        transaction,
        pair,
        to,
        liquidity: value.toFixed(6),
        timestamp: new Date(ctx.block.timestamp)
      })
      await ctx.store.save(mint)
      transaction.mints = mints.concat([mint.id])
      await ctx.store.save(transaction)
    }
  }

  // burn
  if (to === ADDRESS_ZERO && from === pair.id) {
    pair.totalSupply = BigDecimal(pair.totalSupply).minus(value).toFixed(6)

    const { burns } = transaction
    let burn: Burn
    if (burns.length > 0) {
      const currentBurn = await ctx.store.get(Burn, burns[burns.length - 1])
      if (currentBurn?.needsComplete) {
        burn = currentBurn
      } else {
        burn = new Burn({
          id: `${transactionHash}-${burns.length}`,
          transaction,
          needsComplete: false,
          pair,
          liquidity: value.toFixed(6),
          timestamp: new Date(ctx.block.timestamp)
        })
      }
    } else {
      burn = new Burn({
        id: `${transactionHash}-${burns.length}`,
        transaction,
        needsComplete: false,
        pair,
        liquidity: value.toFixed(6),
        timestamp: new Date(ctx.block.timestamp)
      })
    }

    // if this logical burn included a fee mint, account for this
    if (mints.length !== 0 && !(await isCompleteMint(ctx, mints[mints.length - 1]))) {
      const mint = await ctx.store.get(Mint, mints[mints.length - 1])
      if (mint) {
        burn.feeTo = mint.to
        burn.feeLiquidity = mint.liquidity
      }

      await ctx.store.remove(Mint, mints[mints.length - 1])
      mints.pop()
      transaction.mints = mints
    }
    await ctx.store.save(burn)
    if (burn.needsComplete) {
      // TODO: Consider using .slice(0, -1).concat() to protect against
      // unintended side effects for other code paths.
      burns[burns.length - 1] = burn.id
    } else {
      burns.push(burn.id)
    }
    transaction.burns = burns
    await ctx.store.save(transaction)
  }

  if (from !== ADDRESS_ZERO && from !== pair.id) {
    let user = await ctx.store.get(User, from)
    if (!user) {
      user = new User({
        id: from,
        liquidityPositions: [],
        usdSwapped: ZERO_BD.toFixed(6)
      })
      await ctx.store.save(user)
    }
    const position = await updateLiquidityPosition(ctx, pair, user)
    const pairContract = new pairAbi.Contract(ctx, contractAddress)
    position.liquidityTokenBalance = convertTokenToDecimal(
      (await pairContract.balanceOf(from)).toBigInt(),
      18
    ).toFixed(6)
    await ctx.store.save(position)
    await createLiquiditySnapShot(ctx, pair, position)
  }

  if (to !== ADDRESS_ZERO && to !== pair.id) {
    let user = await ctx.store.get(User, to)
    if (!user) {
      user = new User({
        id: to,
        liquidityPositions: [],
        usdSwapped: ZERO_BD.toFixed(6)
      })
      await ctx.store.save(user)
    }
    const position = await updateLiquidityPosition(ctx, pair, user)
    const pairContract = new pairAbi.Contract(ctx, contractAddress)
    position.liquidityTokenBalance = convertTokenToDecimal(
      (await pairContract.balanceOf(to)).toBigInt(),
      18
    ).toFixed(6)
    await ctx.store.save(position)
    await createLiquiditySnapShot(ctx, pair, position)
  }

  await ctx.store.save(pair)
}

async function updateLiquidityPosition(
  ctx: CommonHandlerContext<Store>,
  pair: Pair,
  user: User
): Promise<LiquidityPosition> {
  let position = await getPosition(ctx, `${pair.id}-${user.id}`)
  if (!position) {
    position = createLiquidityPosition({
      pair,
      user
    })

    await ctx.store.save(position)

    pair.liquidityProviderCount += 1
  }
  return position
}

async function createLiquiditySnapShot(
  ctx: CommonHandlerContext<Store>,
  pair: Pair,
  position: LiquidityPosition,
): Promise<void> {
  const bundle = await ctx.store.get(Bundle, '1')
  const { timestamp } = ctx.block
  if (!pair || !bundle) return
  const token0 = await ctx.store.get(Token, pair.token0.id)
  const token1 = await ctx.store.get(Token, pair.token1.id)
  if (!token0 || !token1) return

  // create new snapshot
  const snapshot = new LiquidityPositionSnapshot({
    id: `${position.id}${timestamp}`,
    liquidityPosition: position,
    timestamp: new Date(timestamp),
    block: ctx.block.height,
    user: position.user,
    pair: position.pair,
    token0PriceUSD: BigDecimal(token0.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
    token1PriceUSD: BigDecimal(token1.derivedETH).times(BigDecimal(bundle.ethPrice)).toFixed(6),
    reserve0: pair.reserve0,
    reserve1: pair.reserve1,
    reserveUSD: pair.reserveUSD,
    liquidityTokenTotalSupply: pair.totalSupply,
    liquidityTokenBalance: position.liquidityTokenBalance,
  })
  await ctx.store.save(snapshot)
}

export async function handleSync(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address

  const data = syncEventAbi.decode(evmLogArgs)
  const bundle = await getBundle(ctx)
  const factory = await getFactory(ctx)
  const pair = await getPair(ctx, contractAddress)
  if (!pair) return
  const { token0, token1 } = pair

  factory.totalLiquidityETH = BigDecimal(factory.totalLiquidityETH)
    .minus(pair.trackedReserveETH)
    .toFixed(6)
  token0.totalLiquidity = BigDecimal(token0.totalLiquidity)
    .minus(pair.reserve0)
    .toFixed(6)
  token1.totalLiquidity = BigDecimal(token1.totalLiquidity)
    .minus(pair.reserve1)
    .toFixed(6)

  pair.reserve0 = convertTokenToDecimal(data.reserve0.toBigInt(), token0.decimals).toFixed(6)
  pair.reserve1 = convertTokenToDecimal(data.reserve1.toBigInt(), token1.decimals).toFixed(6)
  pair.token0Price = !BigDecimal(pair.reserve1).eq(ZERO_BD)
    ? BigDecimal(pair.reserve0).div(pair.reserve1).toFixed(6)
    : ZERO_BD.toFixed(6)
  pair.token1Price = !BigDecimal(pair.reserve0).eq(ZERO_BD)
    ? BigDecimal(pair.reserve1).div(pair.reserve0).toFixed(6)
    : ZERO_BD.toFixed(6)
  await ctx.store.save(pair)

  // update ETH price now that reserves could have changed
  bundle.ethPrice = (await getEthPriceInUSD(ctx)).toFixed(6)
  await ctx.store.save(bundle)

  token0.derivedETH = (await findEthPerToken(ctx, token0.id)).toFixed(6)
  token1.derivedETH = (await findEthPerToken(ctx, token1.id)).toFixed(6)

  let trackedLiquidityETH = ZERO_BD
  if (!BigDecimal(bundle.ethPrice).eq(ZERO_BD)) {
    const price0 = BigDecimal(token0.derivedETH).times(bundle.ethPrice)
    const price1 = BigDecimal(token1.derivedETH).times(bundle.ethPrice)

    // both are whitelist tokens, take average of both amounts
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      trackedLiquidityETH = BigDecimal(pair.reserve0)
        .times(price0)
        .plus(BigDecimal(pair.reserve1)
        .times(price1))
    }

    // take double value of the whitelisted token amount
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      trackedLiquidityETH = BigDecimal(pair.reserve0).times(price0).times(2)
    }

    // take double value of the whitelisted token amount
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      trackedLiquidityETH = BigDecimal(pair.reserve1).times(price1).times(2)
    }

    trackedLiquidityETH = trackedLiquidityETH.div(bundle.ethPrice)
  }

  pair.trackedReserveETH = trackedLiquidityETH.toFixed(6)
  pair.reserveETH = BigDecimal(pair.reserve0)
    .times(token0.derivedETH)
    .plus(BigDecimal(pair.reserve1).times(token1.derivedETH))
    .toFixed(6)
  pair.reserveUSD = BigDecimal(pair.reserveETH).times(bundle.ethPrice).toFixed(6)
  await ctx.store.save(pair)

  // use tracked amounts globally
  factory.totalLiquidityETH = BigDecimal(factory.totalLiquidityETH).plus(trackedLiquidityETH).toFixed(6)
  factory.totalLiquidityUSD = BigDecimal(factory.totalLiquidityETH).times(bundle.ethPrice).toFixed(6)
  await ctx.store.save(factory)

  // now correctly set liquidity amounts for each token
  token0.totalLiquidity = BigDecimal(token0.totalLiquidity).plus(pair.reserve0).toFixed(6)
  token1.totalLiquidity = BigDecimal(token1.totalLiquidity).plus(pair.reserve1).toFixed(6)
  await ctx.store.save([token0, token1])
}

export async function handleSwap(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address

  const data = SwapAbi.decode(evmLogArgs)
  const bundle = await getBundle(ctx)
  const factory = await getFactory(ctx)

  const pair = await getPair(ctx, contractAddress)
  if (!pair) return

  const { token0, token1 } = pair

  const amount0In = convertTokenToDecimal(data.amount0In.toBigInt(), token0.decimals)
  const amount0Out = convertTokenToDecimal(data.amount0Out.toBigInt(), token0.decimals)
  const amount0Total = amount0Out.plus(amount0In)

  const amount1In = convertTokenToDecimal(data.amount1In.toBigInt(), token1.decimals)
  const amount1Out = convertTokenToDecimal(data.amount1Out.toBigInt(), token1.decimals)
  const amount1Total = amount1Out.plus(amount1In)

  // get total amounts of derived USD and ETH for tracking
  const derivedAmountETH = BigDecimal(token1.derivedETH)
    .times(amount1Total)
    .plus(BigDecimal(token0.derivedETH).times(amount0Total))
    .div(2)
  const derivedAmountUSD = derivedAmountETH.times(bundle.ethPrice)
  // only accounts for volume through white listed tokens

  let trackedAmountUSD = ZERO_BD
  const price0 = BigDecimal(token0.derivedETH).times(bundle.ethPrice)
  const price1 = BigDecimal(token1.derivedETH).times(bundle.ethPrice)

  const reserve0USD = BigDecimal(pair.reserve0).times(price0)
  const reserve1USD = BigDecimal(pair.reserve1).times(price1)

  // if less than 5 LPs, require high minimum reserve amount amount or return 0
  if (
    pair.liquidityProviderCount < 5 &&
    ((WHITELIST.includes(token0.id) &&
      WHITELIST.includes(token1.id) &&
      reserve0USD.plus(reserve1USD).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) ||
      (WHITELIST.includes(token0.id) &&
        !WHITELIST.includes(token1.id) &&
        reserve0USD.times(2).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)) ||
      (!WHITELIST.includes(token0.id) &&
        WHITELIST.includes(token1.id) &&
        reserve1USD.times(2).lt(MINIMUM_USD_THRESHOLD_NEW_PAIRS)))
  ) {
    // do nothing
  } else {
    // both are whitelist tokens, take average of both amounts
    if (WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      trackedAmountUSD = amount0Total.times(price0).plus(amount1Total.times(price1)).div(2)
    }

    // take full value of the whitelisted token amount
    if (WHITELIST.includes(token0.id) && !WHITELIST.includes(token1.id)) {
      trackedAmountUSD = amount0Total.times(price0)
    }

    // take full value of the whitelisted token amount
    if (!WHITELIST.includes(token0.id) && WHITELIST.includes(token1.id)) {
      trackedAmountUSD = amount1Total.times(price1)
    }
  }

  const trackedAmountETH = BigDecimal(bundle.ethPrice).eq(ZERO_BD)
    ? ZERO_BD
    : trackedAmountUSD.div(bundle.ethPrice)
  // update token0 global volume and token liquidity stats
  token0.tradeVolume = BigDecimal(token0.tradeVolume).plus(amount0Total).toFixed(6)
  token0.tradeVolumeUSD = BigDecimal(token0.tradeVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  token0.untrackedVolumeUSD = BigDecimal(token0.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
  token0.txCount += 1
  // update token1 global volume and token liquidity stats
  token1.tradeVolume = BigDecimal(token1.tradeVolume).plus(amount1Total).toFixed(6)
  token1.tradeVolumeUSD = BigDecimal(token1.tradeVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  token1.untrackedVolumeUSD = BigDecimal(token1.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
  token1.txCount += 1
  await ctx.store.save([token0, token1])

  // update pair volume data, use tracked amount if we have it as its probably more accurate
  pair.volumeUSD = BigDecimal(pair.volumeUSD).plus(trackedAmountUSD).toFixed(6)
  pair.volumeToken0 = BigDecimal(pair.volumeToken0).plus(amount0Total).toFixed(6)
  pair.volumeToken1 = BigDecimal(pair.volumeToken1).plus(amount1Total).toFixed(6)
  pair.untrackedVolumeUSD = BigDecimal(pair.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
  pair.txCount += 1
  await ctx.store.save(pair)

  // update global values, only used tracked amounts for volume
  factory.totalVolumeUSD = BigDecimal(factory.totalVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  factory.totalVolumeETH = BigDecimal(factory.totalVolumeETH).plus(trackedAmountETH).toFixed(6)
  factory.untrackedVolumeUSD = BigDecimal(factory.untrackedVolumeUSD).plus(derivedAmountUSD).toFixed(6)
  factory.txCount += 1
  await ctx.store.save(factory)

  let transaction = await getTransaction(ctx, ctx.event.evmTxHash)
  if (!transaction) {
    transaction = new Transaction({
      id: ctx.event.evmTxHash,
      blockNumber: BigInt(ctx.block.height),
      timestamp: new Date(ctx.block.timestamp),
      mints: [],
      swaps: [],
      burns: [],
    })
    await ctx.store.save(transaction)
  }
  const swapId = `${transaction.id}-${transaction.swaps.length}`

  transaction.swaps.push(swapId)
  await ctx.store.save(transaction)

  const swap = new Swap({
    id: swapId,
    transaction,
    pair,
    timestamp: new Date(ctx.block.timestamp),
    amount0In: amount0In.toFixed(6),
    amount1In: amount1In.toFixed(6),
    amount0Out: amount0Out.toFixed(6),
    amount1Out: amount1Out.toFixed(6),
    sender: data.sender.toLowerCase(),
    from: data.sender.toLowerCase(),
    to: data.to.toLowerCase(),
    logIndex: ctx.event.indexInBlock,
    amountUSD: trackedAmountUSD.eq(ZERO_BD)
      ? derivedAmountUSD.toFixed(6)
      : trackedAmountUSD.toFixed(6),
  })

  await ctx.store.save(swap)

  const pairDayData = await updatePairDayData(ctx)
  const pairHourData = await updatePairHourData(ctx)
  const factoryDayData = await updateFactoryDayData(ctx)
  const token0DayData = await updateTokenDayData(ctx, token0)
  const token1DayData = await updateTokenDayData(ctx, token1)
  await updateZenlinkInfo(ctx)

  // swap specific updating
  factoryDayData.dailyVolumeUSD = BigDecimal(factoryDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  factoryDayData.dailyVolumeETH = BigDecimal(factoryDayData.dailyVolumeETH).plus(trackedAmountETH).toFixed(6)
  factoryDayData.dailyVolumeUntracked = BigDecimal(factoryDayData.dailyVolumeUntracked).plus(derivedAmountUSD).toFixed(6)
  await ctx.store.save(factoryDayData)

  // swap specific updating for pair
  pairDayData.dailyVolumeToken0 = BigDecimal(pairDayData.dailyVolumeToken0).plus(amount0Total).toFixed(6)
  pairDayData.dailyVolumeToken1 = BigDecimal(pairDayData.dailyVolumeToken1).plus(amount1Total).toFixed(6)
  pairDayData.dailyVolumeUSD = BigDecimal(pairDayData.dailyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  await ctx.store.save(pairDayData)

  pairHourData.hourlyVolumeToken0 = BigDecimal(pairHourData.hourlyVolumeToken0).plus(amount0Total).toFixed(6)
  pairHourData.hourlyVolumeToken1 = BigDecimal(pairHourData.hourlyVolumeToken1).plus(amount1Total).toFixed(6)
  pairHourData.hourlyVolumeUSD = BigDecimal(pairHourData.hourlyVolumeUSD).plus(trackedAmountUSD).toFixed(6)
  await ctx.store.save(pairHourData)

  // swap specific updating for token0
  token0DayData.dailyVolumeToken = BigDecimal(token0DayData.dailyVolumeToken).plus(amount0Total).toFixed(6)
  token0DayData.dailyVolumeETH = BigDecimal(token0DayData.dailyVolumeETH)
    .plus(amount0Total.times(token0.derivedETH))
    .toFixed(6)
  token0DayData.dailyVolumeUSD = BigDecimal(token0DayData.dailyVolumeUSD)
    .plus(amount0Total.times(token0.derivedETH).times(bundle.ethPrice))
    .toFixed(6)
  await ctx.store.save(token0DayData)

  // swap specific updating
  token1DayData.dailyVolumeToken = BigDecimal(token1DayData.dailyVolumeToken)
    .plus(amount1Total)
    .toFixed(6)
  token1DayData.dailyVolumeETH = BigDecimal(token1DayData.dailyVolumeETH)
    .plus(amount1Total.times(token1.derivedETH))
    .toFixed(6)
  token1DayData.dailyVolumeUSD = BigDecimal(token1DayData.dailyVolumeUSD).plus(
    amount1Total.times(token1.derivedETH).times(bundle.ethPrice)
  ).toFixed(6)
  await ctx.store.save(token1DayData)
}

export async function handleMint(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const transaction = await ctx.store.get(Transaction, ctx.event.evmTxHash)
  // safety check
  if (!transaction) return
  const { mints } = transaction
  const mint = (await ctx.store.get(Mint, mints[mints.length - 1]))!
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address

  const data = MintAbi.decode(evmLogArgs)
  const factory = await getFactory(ctx)
  const pair = await getPair(ctx, contractAddress)
  if (!pair) return

  const { token0, token1 } = pair
  token0.txCount += 1
  token1.txCount += 1

  // update exchange info (except balances, sync will cover that)
  const token0Amount = convertTokenToDecimal(data.amount0.toBigInt(), token0.decimals)
  const token1Amount = convertTokenToDecimal(data.amount1.toBigInt(), token1.decimals)

  const bundle = (await ctx.store.get(Bundle, '1'))!
  const amountTotalUSD = BigDecimal(token1.derivedETH)
    .times(token1Amount)
    .plus(BigDecimal(token0.derivedETH).times(token0Amount))
    .times(bundle.ethPrice)

  pair.txCount += 1
  factory.txCount += 1

  await ctx.store.save(token0)
  await ctx.store.save(token1)
  await ctx.store.save(pair)
  await ctx.store.save(factory)

  mint.sender = data.sender
  mint.amount0 = token0Amount.toFixed(6)
  mint.amount1 = token1Amount.toFixed(6)
  mint.logIndex = ctx.event.indexInBlock
  mint.amountUSD = amountTotalUSD.toFixed(6)
  await ctx.store.save(mint)

  const user = (await ctx.store.get(User, mint.to))!
  // update the LP position
  const liquidityPosition = createLiquidityPosition({ pair, user })
  await createLiquiditySnapShot(ctx, pair, liquidityPosition)

  // update day entities
  await updatePairDayData(ctx)
  await updatePairHourData(ctx)
  await updateFactoryDayData(ctx)
  await updateTokenDayData(ctx, token0)
  await updateTokenDayData(ctx, token1)
}

export async function handleBurn(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const transaction = await ctx.store.get(Transaction, ctx.event.evmTxHash)
  if (!transaction) return
  const { burns } = transaction
  const burn = (await ctx.store.get(Burn, burns[burns.length - 1]))!
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address

  const data = BurnAbi.decode(evmLogArgs)

  const factory = await getFactory(ctx)

  const pair = await getPair(ctx, contractAddress)
  if (!pair) return

  // update txn counts
  pair.txCount += 1

  // update txn counts
  factory.txCount += 1

  // update txn counts
  const { token0, token1 } = pair
  token0.txCount += 1
  token1.txCount += 1
  const token0Amount = convertTokenToDecimal(data.amount0.toBigInt(), token0.decimals)
  const token1Amount = convertTokenToDecimal(data.amount1.toBigInt(), token1.decimals)

  const bundle = (await ctx.store.get(Bundle, '1'))!
  const amountTotalUSD = BigDecimal(token1.derivedETH)
    .times(token1Amount)
    .plus(BigDecimal(token0.derivedETH).times(token0Amount))
    .times(bundle.ethPrice)

  let user = await ctx.store.get(User, data.sender)
  if (!user) {
    user = new User({
      id: data.sender,
      liquidityPositions: [],
      usdSwapped: ZERO_BD.toFixed(6)
    })
    await ctx.store.save(user)
  }
  await updateLiquidityPosition(ctx, pair, user)

  await ctx.store.save(factory)
  await ctx.store.save(pair)
  await ctx.store.save([token0, token1])

  burn.sender = data.sender
  burn.to = data.to
  burn.amount0 = token0Amount.toFixed(6)
  burn.amount1 = token1Amount.toFixed(6)
  burn.logIndex = ctx.event.indexInBlock
  burn.amountUSD = amountTotalUSD.toFixed(6)
  await ctx.store.save(burn)

  // update the LP position
  const liquidityPosition = createLiquidityPosition({ pair, user })
  await createLiquiditySnapShot(ctx, pair, liquidityPosition)

  // update day entities
  await updatePairDayData(ctx)
  await updatePairHourData(ctx)
  await updateFactoryDayData(ctx)
  await updateTokenDayData(ctx, token0)
  await updateTokenDayData(ctx, token1)
}

