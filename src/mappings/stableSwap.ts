import { decodeHex, EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big as BigDecimal } from 'big.js'
import { getBalancesSwap, getOrCreateStableSwap } from "../entities/stableSwap";
import * as StableSwapContract from "../abis/StableSwap"
import {
  StableSwapAddLiquidityEventData,
  StableSwapEvent,
  StableSwapExchange,
  StableSwapNewFeeEventData,
  StableSwapRampAEventData,
  StableSwapRemoveLiquidityEventData,
  StableSwapStopRampAEventData,
  StableSwapTokenExchangeData
} from "../model";
import { getOrCreateToken } from "../entities/token";
import { ZERO_BD } from "../consts";
import { findUSDPerToken } from "../utils/pricing";
import { 
  updateStableDayData, 
  updateStableSwapDayData, 
  updateStableSwapInfo, 
  updateStableSwapTvl, 
  updateZenlinkInfo 
} from "../utils/updates";

export async function handleStableSwapNewFee(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)

  const event = StableSwapContract.events['NewFee(uint256,uint256)']
    .decode(evmLogArgs)

  stableSwap.swapFee = event.fee.toBigInt()
  stableSwap.adminFee = event.adminFee.toBigInt()
  await ctx.store.save(stableSwap)

  const log = new StableSwapEvent({
    id: `new_fee-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapNewFeeEventData({
      swapFee: event.fee.toBigInt(),
      adminFee: event.adminFee.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleRampA(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)

  const event = StableSwapContract.events['RampA(uint256,uint256,uint256,uint256)']
    .decode(evmLogArgs)

  const log = new StableSwapEvent({
    id: `ramp_A-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapRampAEventData({
      oldA: event.oldA.toBigInt(),
      newA: event.newA.toBigInt(),
      initialTime: event.initialTime.toBigInt(),
      futureTime: event.futureTime.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleStopRampA(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)

  const event = StableSwapContract.events['StopRampA(uint256,uint256)']
    .decode(evmLogArgs)

  stableSwap.a = event.A.toBigInt()
  await ctx.store.save(stableSwap)

  const log = new StableSwapEvent({
    id: `stop_ramp_A-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapStopRampAEventData({
      currentA: event.A.toBigInt(),
      time: event.timestamp.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleStableSwapAddLiquidity(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)
  const balances = await getBalancesSwap(ctx, evmLogArgs.address, stableSwap.numTokens)
  stableSwap.balances = balances

  await updateStableSwapTvl(ctx, stableSwap)
  await updateStableSwapInfo(ctx)
  await updateStableSwapDayData(ctx, stableSwap)
  await updateStableDayData(ctx)

  const event = StableSwapContract.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)']
    .decode(evmLogArgs)

  const log = new StableSwapEvent({
    id: `add_liquidity-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapAddLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: event.tokenAmounts.map((a) => a.toBigInt()),
      fees: event.fees.map((fee) => fee.toBigInt()),
      invariant: event.invariant.toBigInt(),
      lpTokenSupply: event.tokenSupply.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleStableSwapRemoveLiquidity(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)
  const balances = await getBalancesSwap(ctx, evmLogArgs.address, stableSwap.numTokens)
  stableSwap.balances = balances

  await updateStableSwapTvl(ctx, stableSwap)
  await updateStableSwapInfo(ctx)
  await updateStableSwapDayData(ctx, stableSwap)
  await updateStableDayData(ctx)

  const event = StableSwapContract.events['RemoveLiquidity(address,uint256[],uint256[],uint256)']
    .decode(evmLogArgs)

  const log = new StableSwapEvent({
    id: `remove_liquidity-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapRemoveLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: event.tokenAmounts.map((a) => a.toBigInt()),
      lpTokenSupply: event.tokenSupply.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleStableSwapRemoveLiquidityOne(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)
  const balances = await getBalancesSwap(ctx, evmLogArgs.address, stableSwap.numTokens)
  stableSwap.balances = balances

  await updateStableSwapTvl(ctx, stableSwap)
  await updateStableSwapInfo(ctx)
  await updateStableSwapDayData(ctx, stableSwap)
  await updateStableDayData(ctx)

  const event = StableSwapContract.events['RemoveLiquidityOne(address,uint256,uint256,uint256)']
    .decode(evmLogArgs)

  const tokenAmounts: bigint[] = []
  for (let i = 0; i < stableSwap.numTokens; i++) {
    if (i === event.tokenIndex.toNumber()) {
      tokenAmounts.push(event.coinAmount.toBigInt())
    } else {
      tokenAmounts.push(0n)
    }
  }

  const log = new StableSwapEvent({
    id: `remove_liquidity_one-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapRemoveLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleStableSwapRemoveLiquidityImbalance(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)
  const balances = await getBalancesSwap(ctx, evmLogArgs.address, stableSwap.numTokens)
  stableSwap.balances = balances

  await updateStableSwapTvl(ctx, stableSwap)
  await updateStableSwapInfo(ctx)
  await updateStableSwapDayData(ctx, stableSwap)
  await updateStableDayData(ctx)

  const event = StableSwapContract.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)']
    .decode(evmLogArgs)

  const log = new StableSwapEvent({
    id: `remove_liquidity_imbalance-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapRemoveLiquidityEventData({
      provider: decodeHex(event.provider),
      tokenAmounts: event.tokenAmounts.map((a) => a.toBigInt()),
      fees: event.fees.map((fee) => fee.toBigInt()),
      lpTokenSupply: event.tokenSupply.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(log)
}

export async function handleStableSwapExchange(ctx: EvmLogHandlerContext<Store>): Promise<void> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const stableSwap = await getOrCreateStableSwap(ctx, evmLogArgs.address)
  const balances = await getBalancesSwap(ctx, evmLogArgs.address, stableSwap.numTokens)
  stableSwap.balances = balances

  const { tokens } = stableSwap
  let tvl: BigDecimal = BigDecimal('0')
  let tokenUSDPrice = BigDecimal('0')
  for (let i = 0; i < tokens.length; i++) {
    tokenUSDPrice = tokenUSDPrice.gt(ZERO_BD)
      ? tokenUSDPrice
      : await findUSDPerToken(ctx, tokens[i])
    const token = await getOrCreateToken(ctx, tokens[i])
    const balance = balances[i]
    const balanceDecimal: BigDecimal = BigDecimal(balance.toString()).div(10 ** token.decimals)
    tvl = tvl.plus(balanceDecimal)
  }
  stableSwap.tvlUSD = tvl.mul(tokenUSDPrice).toFixed(6)
  await ctx.store.save(stableSwap)

  const stableSwapDayData = await updateStableSwapDayData(ctx, stableSwap)
  const stableDayData = await updateStableDayData(ctx)

  const event = StableSwapContract.events['TokenExchange(address,uint256,uint256,uint256,uint256)']
    .decode(evmLogArgs)

  const exchange = new StableSwapExchange({
    id: `token_exchange-${ctx.event.evmTxHash}`,
    stableSwap,
    data: new StableSwapTokenExchangeData({
      buyer: decodeHex(event.buyer),
      soldId: event.soldId.toBigInt(),
      tokensSold: event.tokensSold.toBigInt(),
      boughtId: event.boughtId.toBigInt(),
      tokensBought: event.tokensBought.toBigInt()
    }),
    block: BigInt(ctx.block.height),
    timestamp: BigInt(ctx.block.timestamp),
    transaction: decodeHex(ctx.event.evmTxHash)
  })

  await ctx.store.save(exchange)

  // save trade volume
  if (event.soldId.toNumber() < tokens.length && event.boughtId.toNumber() < tokens.length) {
    const soldToken = await getOrCreateToken(ctx, tokens[event.soldId.toNumber()])
    const sellVolume = BigDecimal(event.tokensSold.toString()).div(10 ** soldToken.decimals)
    const boughtToken = await getOrCreateToken(ctx, tokens[event.boughtId.toNumber()])
    const buyVolume = BigDecimal(event.tokensBought.toString()).div(10 ** boughtToken.decimals)
    const volume = sellVolume.plus(buyVolume).div(2).mul(tokenUSDPrice)

    stableSwap.volumeUSD = BigDecimal(stableSwap.volumeUSD).add(volume).toFixed(6)
    stableSwapDayData.dailyVolumeUSD = BigDecimal(stableSwapDayData.dailyVolumeUSD).add(volume).toFixed(6)
    stableDayData.dailyVolumeUSD = BigDecimal(stableDayData.dailyVolumeUSD).add(volume).toFixed(6)

    await ctx.store.save(stableSwap)
    await ctx.store.save(stableSwapDayData)
    await ctx.store.save(stableDayData)
  }

  await updateStableSwapInfo(ctx)
  await updateStableDayData(ctx)
  await updateZenlinkInfo(ctx)
}
