import { CommonHandlerContext, decodeHex } from "@subsquid/substrate-processor"
import { Store } from "@subsquid/typeorm-store"
import { Big as BigDecimal } from 'big.js'
import { Equal } from "typeorm"
import { ONE_BD, ZERO_BD } from "../consts"
import { getPair } from "../entities/pair"
import { getOrCreateToken } from "../entities/token"
import { Pair, StableSwap } from "../model"

export const WNATIVE = '0xaeaaf0e2c81af264101b9129c00f4440ccf0f720'.toLowerCase()
export const USDC = '0x6a2d262d56735dba19dd70682b39f6be9a931d98'.toLowerCase()
export const WNATIVE_USDC = '0x77fe816550d8fdd0fcb0cdea66541f3d76918681'.toLowerCase()

export const WHITELIST: string[] = [
  '0xaeaaf0e2c81af264101b9129c00f4440ccf0f720'.toLowerCase(), // wnative
  '0x6a2d262d56735dba19dd70682b39f6be9a931d98'.toLowerCase(), // usdc
  '0x998082c488e548820f970df5173bd2061ce90635'.toLowerCase(), // zlk
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = new BigDecimal(3000)

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = new BigDecimal(5)

export async function getEthPriceInUSD(ctx: CommonHandlerContext<Store>): Promise<BigDecimal> {
  const usdcPair = await getPair(ctx, WNATIVE_USDC)
  if (!usdcPair) return BigDecimal(0)

  return usdcPair.token0.id === USDC
    ? BigDecimal(usdcPair.token0Price)
    : BigDecimal(usdcPair.token1Price)
}

/**
 * Search through graph to find derived Eth per token.
 * @todo update to be derived ETH (plus stablecoin estimates)
 * */
export async function findEthPerToken(
  ctx: CommonHandlerContext<Store>,
  tokenId: string
): Promise<BigDecimal> {
  if (tokenId === WNATIVE) {
    return ONE_BD
  }

  const whitelistPairs = await ctx.store.find(Pair, {
    where: WHITELIST.map((address) => [
      { token0: { id: address }, token1: { id: tokenId } },
      { token1: { id: address }, token0: { id: tokenId } },
    ]).flat(),
    relations: {
      token0: true,
      token1: true,
    },
  })

  // loop through whitelist and check if paired with any
  for (const pair of whitelistPairs) {
    if (BigDecimal(pair.reserveETH).gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
      if (pair.token0.id === tokenId) {
        const token1 = await getOrCreateToken(ctx, pair.token1.id)
        return BigDecimal(pair.token1Price).mul(token1.derivedETH) // return token1 per our token * Eth per token 1
      }
      if (pair.token1.id === tokenId) {
        const token0 = await getOrCreateToken(ctx, pair.token0.id)
        return BigDecimal(pair.token0Price).mul(token0.derivedETH) // return token0 per our token * ETH per token 0
      }
    }
  }
  return ZERO_BD // nothing was found return 0
}

export async function findUSDPerToken(
  ctx: CommonHandlerContext<Store>,
  tokenId: string
): Promise<BigDecimal> {
  const tokenUSDPrice = (await getEthPriceInUSD(ctx)).mul(await findEthPerToken(ctx, tokenId))
  if (tokenUSDPrice.eq(ZERO_BD)) {
    // check for stableSwap lpToken
    const stableSwap = await ctx.store.findOneBy(StableSwap, {
      lpToken: Equal(decodeHex(tokenId))
    })
    if (stableSwap) {
      const { tokens } = stableSwap
      let USDPrice = BigDecimal('0')
      for (const token of tokens) {
        if (USDPrice.gt(ZERO_BD)) break
        USDPrice = await findUSDPerToken(ctx, token)
      }
      return USDPrice
    }
  }
  return tokenUSDPrice
}
