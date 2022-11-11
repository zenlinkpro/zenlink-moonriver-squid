import { CommonHandlerContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { ZERO_BD } from '../consts'
import { Token } from '../model'
import * as ERC20 from '../abis/ERC20'

export async function getOrCreateToken(ctx: CommonHandlerContext<Store>, address: string): Promise<Token> {
  let token = await ctx.store.get(Token, address)

  if (!token) {
    const erc20 = new ERC20.Contract(ctx, address)

    const name = await erc20.name()
    const symbol = await erc20.symbol()
    const decimals = await erc20.decimals()
    const totalSupply = await erc20.totalSupply()

    token = new Token({
      id: address.toLowerCase(),
      symbol,
      name,
      totalSupply: totalSupply.toString(),
      decimals,
      derivedETH: ZERO_BD.toString(),
      tradeVolume: ZERO_BD.toString(),
      tradeVolumeUSD: ZERO_BD.toString(),
      untrackedVolumeUSD: ZERO_BD.toString(),
      totalLiquidity: ZERO_BD.toString(),
      txCount: 0,
    })

    await ctx.store.save(token)
  }

  return token
}
