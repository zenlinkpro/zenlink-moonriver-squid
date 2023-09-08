import { FACTORY_ADDRESS, ZERO_BD } from "../consts"
import {
  Bundle,
  Factory,
  LiquidityPosition,
  StableSwapInfo,
  Transaction,
  ZenlinkInfo
} from "../model"
import { Context, Log } from "../processor"


export async function getTransaction(ctx: Context, id: string) {
  const item = await ctx.store.get(Transaction, id)

  return item
}

export async function getPosition(ctx: Context, id: string) {
  const item = await ctx.store.get(LiquidityPosition, id)

  return item
}

export async function getBundle(ctx: Context) {
  const bundle = await ctx.store.get(Bundle, '1')

  return bundle!
}

export async function getFactory(ctx: Context) {
  const factory = await ctx.store.get(Factory, FACTORY_ADDRESS)

  return factory!
}

export async function getStableSwapInfo(ctx: Context) {
  let stbleSwapInfo = await ctx.store.get(StableSwapInfo, {
    where: { id: '1' },
    relations: { swaps: true }
  })
  if (!stbleSwapInfo) {
    stbleSwapInfo = new StableSwapInfo({
      id: '1',
      poolCount: 0,
      totalVolumeUSD: ZERO_BD.toFixed(6),
      totalTvlUSD: ZERO_BD.toFixed(6),
      txCount: 0,
      swaps: []
    })
    await ctx.store.save(stbleSwapInfo)
  }

  return stbleSwapInfo
}

export async function getZenlinkInfo(ctx: Context, log: Log) {
  let zenlinkInfo = await ctx.store.get(ZenlinkInfo, {
    where: { id: '1' },
    relations: { factory: true, stableSwapInfo: true }
  })
  if (!zenlinkInfo) {
    zenlinkInfo = new ZenlinkInfo({
      id: '1',
      updatedDate: new Date(log.block.timestamp),
      totalVolumeUSD: ZERO_BD.toFixed(6),
      totalTvlUSD: ZERO_BD.toFixed(6),
      txCount: 0,
      factory: await getFactory(ctx),
      stableSwapInfo: await getStableSwapInfo(ctx)
    })
    await ctx.store.save(zenlinkInfo)
  }

  return zenlinkInfo
}
