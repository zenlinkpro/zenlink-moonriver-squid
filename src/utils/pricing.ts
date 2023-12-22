import { Big as BigDecimal } from 'big.js'
import { ONE_BD, ZERO_BD } from "../consts"
import { getPair } from "../entities/pair"
import { getOrCreateToken } from "../entities/token"
import { Pair, StableSwap } from "../model"
import { Context, Log } from "../processor"

export const WNATIVE = '0x98878b06940ae243284ca214f92bb71a2b032b8a'.toLowerCase()
export const USDC = '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d'.toLowerCase()
export const FRAX = '0x1A93B23281CC1CDE4C4741353F3064709A16197d'.toLowerCase()
export const WNATIVE_USDC = '0x3933B0214b3B117fB52646343076D229817A4e4b'.toLowerCase()
export const WNATIVE_FRAX = '0x9A3cf92a7EC9D13FD28BCa1BEaD6fF263C8D766E'.toLowerCase()

export const WHITELIST: string[] = [
  WNATIVE,
  USDC,
  '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080'.toLowerCase(), // ksm
  '0x0f47ba9d9bde3442b42175e51d6a367928a1173b'.toLowerCase(), // zlk
  FRAX
]

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = new BigDecimal(50)

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = new BigDecimal(5)

export async function getEthPriceInUSD(ctx: Context): Promise<BigDecimal> {
  const fraxPair = await getPair(ctx, WNATIVE_FRAX)
  const usdcPair = await getPair(ctx, WNATIVE_USDC)

  if (fraxPair && BigDecimal(fraxPair.reserveETH).gt(MINIMUM_LIQUIDITY_THRESHOLD_ETH)) {
    return fraxPair.token0.id === FRAX
      ? BigDecimal(fraxPair.token0Price)
      : BigDecimal(fraxPair.token1Price)
  }
  
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
  ctx: Context,
  log: Log,
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
        const token1 = await getOrCreateToken(ctx, log, pair.token1.id)
        return BigDecimal(pair.token1Price).mul(token1.derivedETH) // return token1 per our token * Eth per token 1
      }
      if (pair.token1.id === tokenId) {
        const token0 = await getOrCreateToken(ctx, log, pair.token0.id)
        return BigDecimal(pair.token0Price).mul(token0.derivedETH) // return token0 per our token * ETH per token 0
      }
    }
  }
  return ZERO_BD // nothing was found return 0
}

export async function findUSDPerToken(
  ctx: Context,
  log: Log,
  tokenId: string
): Promise<BigDecimal> {
  const tokenUSDPrice = (await getEthPriceInUSD(ctx)).mul(await findEthPerToken(ctx, log, tokenId))
  if (tokenUSDPrice.eq(ZERO_BD)) {
    // check for stableSwap lpToken
    const stableSwap = await ctx.store.findOneBy(StableSwap, {
      lpToken: tokenId
    })
    if (stableSwap) {
      const { tokens } = stableSwap
      let USDPrice = BigDecimal('0')
      for (const token of tokens) {
        if (USDPrice.gt(ZERO_BD)) break
        USDPrice = await findUSDPerToken(ctx, log, token)
      }
      return USDPrice
    }
  }
  return tokenUSDPrice
}
