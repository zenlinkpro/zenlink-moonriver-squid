import { Big as BigDecimal } from 'big.js'
import { assertNotNull, decodeHex } from "@subsquid/evm-processor";
import { getBalancesSwap, getOrCreateStableSwap } from "../entities/stableSwap";
import * as StableSwapContract from "../abis/StableSwap"
import * as ERC20Contract from "../abis/ERC20"
import {
  StableSwap,
  StableSwapAddLiquidityEventData,
  StableSwapEvent,
  StableSwapExchange,
  StableSwapLiquidityPosition,
  StableSwapNewFeeEventData,
  StableSwapRampAEventData,
  StableSwapRemoveLiquidityEventData,
  StableSwapStopRampAEventData,
  StableSwapTokenExchangeData,
  User
} from "../model";
import { getOrCreateToken } from "../entities/token";
import { ADDRESS_ZERO, ZERO_BD, ZERO_BI } from "../consts";
import { findUSDPerToken } from "../utils/pricing";
import {
  updateStableDayData,
  updateStableSwapDayData,
  updateStableSwapHourData,
  updateStableSwapInfo,
  updateStableSwapTvl,
  updateZenlinkInfo
} from "../utils/updates";
import { Context, Log } from "../processor";

async function updateStableSwapLiquidityPosition(
  ctx: Context,
  stableSwap: StableSwap,
  user: User
): Promise<StableSwapLiquidityPosition> {
  const id = `${stableSwap.lpToken}-${user.id}`
  let position = await ctx.store.get(StableSwapLiquidityPosition, id)
  if (!position) {
    position = new StableSwapLiquidityPosition({
      id,
      stableSwap,
      user,
      liquidityTokenBalance: ZERO_BI.toString()
    })

    await ctx.store.save(position)
  }
  return position
}

export async function handleStableSwapTransfer(ctx: Context, log: Log) {
  const event = ERC20Contract.events.Transfer.decode(log)

  let { from, to } = event
  from = from.toLowerCase()
  to = to.toLowerCase()

  const stableSwap = await ctx.store.get(StableSwap, { where: { lpToken: log.address } })
  if (!stableSwap) return

  const lpContract = new ERC20Contract.Contract({ ...ctx, block: log.block }, log.address)

  // mints or burns
  if (from === ADDRESS_ZERO || to === ADDRESS_ZERO) {
    stableSwap.lpTotalSupply = (await lpContract.totalSupply()).toString()
  }

  if (from !== ADDRESS_ZERO && from !== stableSwap.address.toString()) {
    let user = await ctx.store.get(User, from)
    if (!user) {
      user = new User({
        id: from,
        liquidityPositions: [],
        stableSwapLiquidityPositions: [],
        usdSwapped: ZERO_BD.toString()
      })
      await ctx.store.save(user)
    }
    const position = await updateStableSwapLiquidityPosition(ctx, stableSwap, user)
    position.liquidityTokenBalance = (await lpContract.balanceOf(from)).toString()
    await ctx.store.save(position)
  }

  if (to !== ADDRESS_ZERO && to !== stableSwap.address.toString()) {
    let user = await ctx.store.get(User, to)
    if (!user) {
      user = new User({
        id: to,
        liquidityPositions: [],
        stableSwapLiquidityPositions: [],
        usdSwapped: ZERO_BD.toString()
      })
      await ctx.store.save(user)
    }
    const position = await updateStableSwapLiquidityPosition(ctx, stableSwap, user)
    position.liquidityTokenBalance = (await lpContract.balanceOf(to)).toString()
    await ctx.store.save(position)
  }

  await ctx.store.save(stableSwap)
}

export async function handleStableSwapNewFee(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)

  const event = StableSwapContract.events.NewFee.decode(log)

  stableSwap.swapFee = event.fee
  stableSwap.adminFee = event.adminFee
  await ctx.store.save(stableSwap)

  const eventLog = new StableSwapEvent({
    id: `new_fee-${transaction.hash}`,
    stableSwap,
    data: new StableSwapNewFeeEventData({
      swapFee: event.fee,
      adminFee: event.adminFee
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleRampA(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)

  const event = StableSwapContract.events.RampA.decode(log)

  const eventLog = new StableSwapEvent({
    id: `ramp_A-${transaction.hash}`,
    stableSwap,
    data: new StableSwapRampAEventData({
      oldA: event.oldA,
      newA: event.newA,
      initialTime: event.initialTime,
      futureTime: event.futureTime
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleStopRampA(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)

  const event = StableSwapContract.events.StopRampA.decode(log)

  stableSwap.a = event.A
  await ctx.store.save(stableSwap)

  const eventLog = new StableSwapEvent({
    id: `stop_ramp_A-${transaction.hash}`,
    stableSwap,
    data: new StableSwapStopRampAEventData({
      currentA: event.A,
      time: event.timestamp
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleStableSwapAddLiquidity(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)
  const balances = await getBalancesSwap(ctx, log, log.address, stableSwap.numTokens)
  stableSwap.balances = balances.map(b => b.toString())

  await updateStableSwapTvl(ctx, log, stableSwap)
  await updateStableSwapInfo(ctx, log)
  await updateStableSwapDayData(ctx, log, stableSwap)
  await updateStableSwapHourData(ctx, log, stableSwap)
  await updateStableDayData(ctx, log)

  const event = StableSwapContract.events.AddLiquidity.decode(log)

  const eventLog = new StableSwapEvent({
    id: `add_liquidity-${transaction.hash}`,
    stableSwap,
    data: new StableSwapAddLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: event.tokenAmounts.map(ta => ta.toString()),
      fees: event.fees.map(fee => fee.toString()),
      invariant: event.invariant,
      lpTokenSupply: event.tokenSupply
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleStableSwapRemoveLiquidity(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)
  const balances = await getBalancesSwap(ctx, log, log.address, stableSwap.numTokens)
  stableSwap.balances = balances.map(b => b.toString())

  await updateStableSwapTvl(ctx, log, stableSwap)
  await updateStableSwapInfo(ctx, log)
  await updateStableSwapDayData(ctx, log, stableSwap)
  await updateStableSwapHourData(ctx, log, stableSwap)
  await updateStableDayData(ctx, log)

  const event = StableSwapContract.events.RemoveLiquidity.decode(log)

  const eventLog = new StableSwapEvent({
    id: `remove_liquidity-${transaction.hash}`,
    stableSwap,
    data: new StableSwapRemoveLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: event.tokenAmounts.map(ta => ta.toString()),
      lpTokenSupply: event.tokenSupply
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleStableSwapRemoveLiquidityOne(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)
  const balances = await getBalancesSwap(ctx, log, log.address, stableSwap.numTokens)
  stableSwap.balances = balances.map(b => b.toString())

  await updateStableSwapTvl(ctx, log, stableSwap)
  await updateStableSwapInfo(ctx, log)
  await updateStableSwapDayData(ctx, log, stableSwap)
  await updateStableSwapHourData(ctx, log, stableSwap)
  await updateStableDayData(ctx, log)

  const event = StableSwapContract.events.RemoveLiquidityOne.decode(log)

  const tokenAmounts: bigint[] = []
  for (let i = 0; i < stableSwap.numTokens; i++) {
    if (i === Number(event.tokenIndex)) {
      tokenAmounts.push(event.coinAmount)
    } else {
      tokenAmounts.push(0n)
    }
  }

  const eventLog = new StableSwapEvent({
    id: `remove_liquidity_one-${transaction.hash}`,
    stableSwap,
    data: new StableSwapRemoveLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: tokenAmounts.map(ta => ta.toString())
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleStableSwapRemoveLiquidityImbalance(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)
  const balances = await getBalancesSwap(ctx, log, log.address, stableSwap.numTokens)
  stableSwap.balances = balances.map(b => b.toString())

  await updateStableSwapTvl(ctx, log, stableSwap)
  await updateStableSwapInfo(ctx, log)
  await updateStableSwapDayData(ctx, log, stableSwap)
  await updateStableSwapHourData(ctx, log, stableSwap)
  await updateStableDayData(ctx, log)

  const event = StableSwapContract.events.RemoveLiquidityImbalance.decode(log)

  const eventLog = new StableSwapEvent({
    id: `remove_liquidity_imbalance-${transaction.hash}`,
    stableSwap,
    data: new StableSwapRemoveLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: event.tokenAmounts.map(ta => ta.toString()),
      fees: event.fees.map(fee => fee.toString()),
      lpTokenSupply: event.tokenSupply
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(eventLog)
}

export async function handleStableSwapExchange(ctx: Context, log: Log): Promise<void> {
  const transaction = assertNotNull(log.transaction, `Missing transaction`)
  const stableSwap = await getOrCreateStableSwap(ctx, log, log.address)
  const balances = await getBalancesSwap(ctx, log, log.address, stableSwap.numTokens)
  stableSwap.balances = balances.map(b => b.toString())

  const { tokens } = stableSwap
  let tvl: BigDecimal = BigDecimal('0')
  let tokenUSDPrice = BigDecimal('0')
  for (let i = 0; i < tokens.length; i++) {
    tokenUSDPrice = tokenUSDPrice.gt(ZERO_BD)
      ? tokenUSDPrice
      : await findUSDPerToken(ctx, log, tokens[i])
    const token = await getOrCreateToken(ctx, log, tokens[i])
    const balance = balances[i]
    const balanceDecimal: BigDecimal = BigDecimal(balance.toString()).div(10 ** token.decimals)
    tvl = tvl.plus(balanceDecimal)
  }
  stableSwap.tvlUSD = tvl.mul(tokenUSDPrice).toFixed(6)
  await ctx.store.save(stableSwap)

  const stableSwapDayData = await updateStableSwapDayData(ctx, log, stableSwap)
  const stableSwapHourData = await updateStableSwapHourData(ctx, log, stableSwap)
  const stableDayData = await updateStableDayData(ctx, log)

  const event = StableSwapContract.events.TokenExchange.decode(log)

  const exchange = new StableSwapExchange({
    id: `token_exchange-${transaction.hash}`,
    stableSwap,
    data: new StableSwapTokenExchangeData({
      buyer: decodeHex(event.buyer),
      soldId: event.soldId,
      tokensSold: event.tokensSold,
      boughtId: event.boughtId,
      tokensBought: event.tokensBought
    }),
    block: BigInt(log.block.height),
    timestamp: BigInt(log.block.timestamp),
    transaction: decodeHex(transaction.hash)
  })

  await ctx.store.save(exchange)

  // save trade volume
  if (Number(event.soldId) < tokens.length && Number(event.boughtId) < tokens.length) {
    const soldToken = await getOrCreateToken(ctx, log, tokens[Number(event.soldId)])
    const sellVolume = BigDecimal(event.tokensSold.toString()).div(10 ** soldToken.decimals)
    const boughtToken = await getOrCreateToken(ctx, log, tokens[Number(event.boughtId)])
    const buyVolume = BigDecimal(event.tokensBought.toString()).div(10 ** boughtToken.decimals)
    const volume = sellVolume.plus(buyVolume).div(2).mul(tokenUSDPrice)

    stableSwap.volumeUSD = BigDecimal(stableSwap.volumeUSD).add(volume).toFixed(6)
    stableSwapDayData.dailyVolumeUSD = BigDecimal(stableSwapDayData.dailyVolumeUSD).add(volume).toFixed(6)
    stableSwapHourData.hourlyVolumeUSD = BigDecimal(stableSwapHourData.hourlyVolumeUSD).add(volume).toFixed(6)
    stableDayData.dailyVolumeUSD = BigDecimal(stableDayData.dailyVolumeUSD).add(volume).toFixed(6)

    await ctx.store.save(stableSwap)
    await ctx.store.save(stableSwapDayData)
    await ctx.store.save(stableSwapHourData)
    await ctx.store.save(stableDayData)
  }

  await updateStableSwapInfo(ctx, log)
  await updateStableDayData(ctx, log)
  await updateZenlinkInfo(ctx, log)
}
