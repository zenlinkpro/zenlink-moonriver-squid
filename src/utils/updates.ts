import { EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big as BigDecimal } from 'big.js'
import { FACTORY_ADDRESS, ZERO_BD } from "../consts";
import { getOrCreateToken } from "../entities/token";
import { getStableSwapInfo, getZenlinkInfo } from "../entities/utils";
import {
  Bundle,
  Factory,
  Pair,
  PairDayData,
  PairHourData,
  StableDayData,
  StableSwap,
  StableSwapDayData,
  StableSwapInfo,
  Token,
  TokenDayData,
  FactoryDayData,
  ZenlinkDayInfo,
  ZenlinkInfo,
  StableSwapHourData
} from "../model";
import { findUSDPerToken } from "./pricing";

export async function updateFactoryDayData(ctx: EvmLogHandlerContext<Store>): Promise<FactoryDayData> {
  const factory = (await ctx.store.get(Factory, FACTORY_ADDRESS))
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  let factoryDayData = await ctx.store.get(FactoryDayData, dayID.toString())
  if (!factoryDayData) {
    factoryDayData = new FactoryDayData({
      id: dayID.toString(),
      date: new Date(dayStartTimestamp),
      dailyVolumeUSD: ZERO_BD.toString(),
      dailyVolumeETH: ZERO_BD.toString(),
      totalVolumeUSD: ZERO_BD.toString(),
      totalVolumeETH: ZERO_BD.toString(),
      dailyVolumeUntracked: ZERO_BD.toString()
    })
  }
  factoryDayData.totalLiquidityUSD = factory?.totalLiquidityUSD || ZERO_BD.toString()
  factoryDayData.totalLiquidityETH = factory?.totalLiquidityETH || ZERO_BD.toString()
  factoryDayData.txCount = factory?.txCount || 0
  await ctx.store.save(factoryDayData)
  await updateZenlinkDayInfo(ctx)
  return factoryDayData
}

export async function updatePairDayData(ctx: EvmLogHandlerContext<Store>): Promise<PairDayData> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const dayPairID = `${contractAddress as string}-${dayID}`
  const pair = (await ctx.store.get(Pair, contractAddress))!
  let pairDayData = await ctx.store.get(PairDayData, dayPairID)
  if (!pairDayData) {
    pairDayData = new PairDayData({
      id: dayPairID,
      date: new Date(dayStartTimestamp),
      token0: pair.token0,
      token1: pair.token1,
      pair,
      pairAddress: contractAddress,
      dailyVolumeToken0: ZERO_BD.toString(),
      dailyVolumeToken1: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
      dailyTxns: 0
    })
  }
  pairDayData.totalSupply = pair.totalSupply
  pairDayData.reserve0 = pair.reserve0
  pairDayData.reserve1 = pair.reserve1
  pairDayData.reserveUSD = pair.reserveUSD
  pairDayData.dailyTxns += 1
  await ctx.store.save(pairDayData)
  return pairDayData
}

export async function updatePairHourData(ctx: EvmLogHandlerContext<Store>): Promise<PairHourData> {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address
  const { timestamp } = ctx.block
  const hourIndex = parseInt((timestamp / 3600000).toString(), 10)
  const hourStartUnix = Number(hourIndex) * 3600000
  const dayPairID = `${contractAddress as string}-${hourIndex}`
  const pair = (await ctx.store.get(Pair, contractAddress))!
  let pairHourData = await ctx.store.get(PairHourData, dayPairID)
  if (!pairHourData) {
    pairHourData = new PairHourData({
      id: dayPairID,
      hourStartUnix: BigInt(hourStartUnix),
      pair,
      hourlyVolumeToken0: ZERO_BD.toString(),
      hourlyVolumeToken1: ZERO_BD.toString(),
      hourlyVolumeUSD: ZERO_BD.toString(),
      hourlyTxns: 0
    })
  }
  pairHourData.totalSupply = pair.totalSupply
  pairHourData.reserve0 = pair.reserve0
  pairHourData.reserve1 = pair.reserve1
  pairHourData.reserveUSD = pair.reserveUSD
  pairHourData.hourlyTxns += 1
  await ctx.store.save(pairHourData)
  return pairHourData
}

export async function updateTokenDayData(
  ctx: EvmLogHandlerContext<Store>,
  token: Token
): Promise<TokenDayData> {
  const bundle = (await ctx.store.get(Bundle, '1'))!
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const tokenDayID = `${token.id}-${dayID}`
  let tokenDayData = await ctx.store.get(TokenDayData, tokenDayID)
  if (!tokenDayData) {
    tokenDayData = new TokenDayData({
      id: tokenDayID,
      date: new Date(dayStartTimestamp),
      token,
      priceUSD: BigDecimal(token.derivedETH).times(bundle.ethPrice).toString(),
      dailyVolumeToken: ZERO_BD.toString(),
      dailyVolumeETH: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
      dailyTxns: 0,
      totalLiquidityUSD: ZERO_BD.toString()
    })
  }
  tokenDayData.priceUSD = BigDecimal(token.derivedETH).times(bundle.ethPrice).toFixed(6)
  tokenDayData.totalLiquidityToken = token.totalLiquidity
  tokenDayData.totalLiquidityETH = BigDecimal(token.totalLiquidity).times(token.derivedETH).toString()
  tokenDayData.totalLiquidityUSD = BigDecimal(tokenDayData.totalLiquidityETH).times(bundle.ethPrice).toFixed(6)
  tokenDayData.dailyTxns += 1
  await ctx.store.save(tokenDayData)
  return tokenDayData
}

export async function updateStableSwapTvl(
  ctx: EvmLogHandlerContext<Store>,
  stableSwap: StableSwap
): Promise<StableSwap> {
  const { tokens } = stableSwap
  let tvl: BigDecimal = BigDecimal('0')
  let tokenUSDPrice = BigDecimal('0')
  for (let i = 0; i < tokens.length; i++) {
    tokenUSDPrice = tokenUSDPrice.gt(ZERO_BD)
      ? tokenUSDPrice
      : await findUSDPerToken(ctx, tokens[i])
    const token = await getOrCreateToken(ctx, tokens[i])
    const balance = stableSwap.balances[i]
    const balanceDecimal: BigDecimal = BigDecimal(balance.toString()).div(10 ** token.decimals)
    tvl = tvl.plus(balanceDecimal)
  }
  stableSwap.tvlUSD = tvl.mul(tokenUSDPrice).toFixed(6)

  await ctx.store.save(stableSwap)
  return stableSwap
}

export async function updateStableSwapDayData(
  ctx: EvmLogHandlerContext<Store>,
  stableSwap: StableSwap
): Promise<StableSwapDayData> {
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const stableSwapDayID = `${stableSwap.id}-${dayID}`
  let stableSwapDayData = await ctx.store.get(StableSwapDayData, stableSwapDayID)
  if (!stableSwapDayData) {
    stableSwapDayData = new StableSwapDayData({
      id: stableSwapDayID,
      date: new Date(dayStartTimestamp),
      stableSwap,
      dailyVolumeUSD: ZERO_BD.toString(),
      tvlUSD: ZERO_BD.toString(),
    })
  }
  stableSwapDayData.tvlUSD = stableSwap.tvlUSD
  await ctx.store.save(stableSwapDayData)
  return stableSwapDayData
}

export async function updateStableSwapHourData(
  ctx: EvmLogHandlerContext<Store>,
  stableSwap: StableSwap
): Promise<StableSwapHourData> {
  const contractAddress = stableSwap.lpToken
  const { timestamp } = ctx.block
  const hourIndex = parseInt((timestamp / 3600000).toString(), 10)
  const hourStartUnix = Number(hourIndex) * 3600000
  const hourID = `${contractAddress}-${hourIndex}`
  let stableSwapHourData = await ctx.store.get(StableSwapHourData, hourID)
  if (!stableSwapHourData) {
    stableSwapHourData = new StableSwapHourData({
      id: hourID,
      hourStartUnix: BigInt(hourStartUnix),
      stableSwap,
      hourlyVolumeUSD: ZERO_BD.toString(),
      tvlUSD: ZERO_BD.toString(),
    })
  }
  stableSwapHourData.tvlUSD = stableSwap.tvlUSD
  await ctx.store.save(stableSwapHourData)
  return stableSwapHourData
}

export async function updateStableDayData(ctx: EvmLogHandlerContext<Store>): Promise<StableDayData> {
  const stableSwapInfo = await getStableSwapInfo(ctx)
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  let stableDayData = await ctx.store.get(StableDayData, dayID.toString())
  if (!stableDayData) {
    stableDayData = new StableDayData({
      id: dayID.toString(),
      date: new Date(dayStartTimestamp),
      tvlUSD: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
    })
  }
  stableDayData.tvlUSD = stableSwapInfo.totalTvlUSD
  await ctx.store.save(stableDayData)
  await updateZenlinkDayInfo(ctx)
  return stableDayData
}

export async function updateZenlinkDayInfo(ctx: EvmLogHandlerContext<Store>): Promise<ZenlinkDayInfo> {
  const { timestamp } = ctx.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  let factoryDayData = await ctx.store.get(FactoryDayData, dayID.toString())
  if (!factoryDayData) {
    factoryDayData = await updateFactoryDayData(ctx)
  }
  let stableDayData = await ctx.store.get(StableDayData, dayID.toString())
  if (!stableDayData) {
    stableDayData = await updateStableDayData(ctx)
  }
  let zenlinkDayInfo = await ctx.store.get(ZenlinkDayInfo, dayID.toString())
  if (!zenlinkDayInfo) {
    zenlinkDayInfo = new ZenlinkDayInfo({
      id: dayID.toString(),
      date: new Date(dayStartTimestamp),
      tvlUSD: ZERO_BD.toString(),
      dailyVolumeUSD: ZERO_BD.toString(),
    })
  }
  zenlinkDayInfo.tvlUSD = BigDecimal(factoryDayData.totalLiquidityUSD)
    .add(stableDayData.tvlUSD)
    .toFixed(6)
  zenlinkDayInfo.dailyVolumeUSD = BigDecimal(factoryDayData.dailyVolumeUSD)
    .add(stableDayData.dailyVolumeUSD)
    .toFixed(6)
  await ctx.store.save(zenlinkDayInfo)
  return zenlinkDayInfo
}

export async function updateStableSwapInfo(ctx: EvmLogHandlerContext<Store>): Promise<StableSwapInfo> {
  const stableSwapInfo = await getStableSwapInfo(ctx)
  let tvlUSD = BigDecimal(0)
  let volumeUSD = BigDecimal(0)
  const { swaps } = stableSwapInfo
  swaps.forEach(swap => {
    tvlUSD = tvlUSD.add(swap.tvlUSD)
    volumeUSD = volumeUSD.add(swap.volumeUSD)
  })
  stableSwapInfo.totalTvlUSD = tvlUSD.toFixed(6)
  stableSwapInfo.totalVolumeUSD = volumeUSD.toFixed(6)
  stableSwapInfo.txCount += 1

  await ctx.store.save(stableSwapInfo)
  await updateZenlinkInfo(ctx)
  return stableSwapInfo
}

export async function updateZenlinkInfo(ctx: EvmLogHandlerContext<Store>): Promise<ZenlinkInfo> {
  const zenlinkInfo = await getZenlinkInfo(ctx)
  const { factory, stableSwapInfo } = zenlinkInfo
  zenlinkInfo.totalTvlUSD = BigDecimal(factory?.totalLiquidityUSD || '0')
    .add(stableSwapInfo.totalTvlUSD)
    .toFixed(6)
  zenlinkInfo.totalVolumeUSD = BigDecimal(factory?.totalVolumeUSD || '0')
    .add(stableSwapInfo.totalVolumeUSD)
    .toFixed(6)
  zenlinkInfo.txCount = (factory?.txCount || 0) + stableSwapInfo.txCount
  zenlinkInfo.updatedDate = new Date(ctx.block.timestamp)
  await ctx.store.save(zenlinkInfo)
  return zenlinkInfo
}
