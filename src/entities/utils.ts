import { CommonHandlerContext } from "@subsquid/substrate-processor"
import { Store } from "@subsquid/typeorm-store"
import { FACTORY_ADDRESS, ZERO_BD } from "../consts"
import {
  Bundle,
  Factory,
  LiquidityPosition,
  StableSwapInfo,
  Transaction,
  ZenlinkInfo
} from "../model"


export async function getTransaction(ctx: CommonHandlerContext<Store>, id: string) {
  const item = await ctx.store.get(Transaction, id)

  return item
}

export async function getPosition(ctx: CommonHandlerContext<Store>, id: string) {
  const item = await ctx.store.get(LiquidityPosition, id)

  return item
}

export async function getBundle(ctx: CommonHandlerContext<Store>) {
  const bundle = await ctx.store.get(Bundle, '1')

  return bundle!
}

export async function getFactory(ctx: CommonHandlerContext<Store>) {
  const factory = await ctx.store.get(Factory, FACTORY_ADDRESS)

  return factory!
}

export async function getStableSwapInfo(ctx: CommonHandlerContext<Store>) {
  let stbleSwapInfo = await ctx.store.get(StableSwapInfo, {
    where: { id: '1' },
    relations: { swaps: true }
  })
  if (!stbleSwapInfo) {
    stbleSwapInfo = new StableSwapInfo({
      id: '1',
      poolCount: 0,
      totalVolumeUSD: ZERO_BD.toString(),
      totalTvlUSD: ZERO_BD.toString(),
      txCount: 0,
      swaps: []
    })
    await ctx.store.save(stbleSwapInfo)
  }

  return stbleSwapInfo
}

export async function getZenlinkInfo(ctx: CommonHandlerContext<Store>) {
  let zenlinkInfo = await ctx.store.get(ZenlinkInfo, {
    where: { id: '1' },
    relations: { factory: true, stableSwapInfo: true }
  })
  if (!zenlinkInfo) {
    zenlinkInfo = new ZenlinkInfo({
      id: '1',
      updatedDate: new Date(ctx.block.timestamp),
      totalVolumeUSD: ZERO_BD.toString(),
      totalTvlUSD: ZERO_BD.toString(),
      txCount: 0,
      factory: await getFactory(ctx),
      stableSwapInfo: await getStableSwapInfo(ctx)
    })
    await ctx.store.save(zenlinkInfo)
  }

  return zenlinkInfo
}
