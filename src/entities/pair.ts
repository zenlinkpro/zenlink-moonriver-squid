import { Pair } from '../model'
import { Context } from '../processor'

export async function getPair(ctx: Context, id: string) {
  const item = await ctx.store.get(Pair, {
    where: { id },
    relations: { token0: true, token1: true },
  })

  return item
}
