import { decodeHex, EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { StableSwap } from "../model";
import * as StableSwapContract from "../abis/StableSwap"
import { ADDRESS_ZERO, ZERO_BD } from "../consts";
import { getStableSwapInfo } from "./utils";

interface SwapInfo {
  baseSwapAddress: string
  tokens: string[]
  baseTokens: string[]
  allTokens: string[] // tokens + basePool Tokens (metaSwap)
  balances: bigint[]
  a: bigint
  swapFee: bigint
  adminFee: bigint
  virtualPrice: bigint
  lpToken: string
}

export async function getOrCreateStableSwap(
  ctx: EvmLogHandlerContext<Store>, 
  address: string
): Promise<StableSwap> {
  let stableSwap = await ctx.store.get(StableSwap, address)
  if (!stableSwap) {
    const info = await getSwapInfo(ctx, address)
    const stableSwapInfo = await getStableSwapInfo(ctx)
    stableSwap = new StableSwap({
      id: address,
      address: decodeHex(address),
      baseSwapAddress: decodeHex(info.baseSwapAddress),
      numTokens: info.tokens.length,
      tokens: info.tokens,
      baseTokens: info.tokens,
      allTokens: info.tokens,
      balances: info.balances,
      lpToken: decodeHex(info.lpToken),
      a: info.a,
      swapFee: info.swapFee,
      adminFee: info.adminFee,
      virtualPrice: info.virtualPrice,
      tvlUSD: ZERO_BD.toString(),
      volumeUSD: ZERO_BD.toString(),
      stableSwapInfo
    })
    
    stableSwapInfo.poolCount += 1
    await ctx.store.save(stableSwap)
    await ctx.store.save(stableSwapInfo)
  }
  return stableSwap
}

export async function getSwapInfo(
  ctx: EvmLogHandlerContext<Store>, 
  address: string
): Promise<SwapInfo> {
  const swapContract = new StableSwapContract.Contract(ctx, address)

  const tokens: string[] = []
  const balances: bigint[] = []

  let i = 0

  while (true) {
    try {
      const token = (await swapContract.getToken(i)).toLowerCase()
      const balance = (await swapContract.getTokenBalance(i)).toBigInt()

      if (token !== ADDRESS_ZERO) {
        tokens.push(token)
      }

      balances.push(balance)

      i++
    } catch (e) {
      break
    }
  }

  const swapStorage = await swapContract.swapStorage()

  return {
    baseSwapAddress: address,
    tokens,
    baseTokens: tokens,
    allTokens: tokens,
    balances,
    a: (await swapContract.getA()).toBigInt(),
    swapFee: swapStorage[1].toBigInt(),
    adminFee: swapStorage[2].toBigInt(),
    virtualPrice: (await swapContract.getVirtualPrice()).toBigInt(),
    lpToken: swapStorage[0],
  }
}

export async function getBalancesSwap(
  ctx: EvmLogHandlerContext<Store>,
  swap: string,
  N_COINS: number
): Promise<bigint[]> {
  const swapContract = new StableSwapContract.Contract(ctx, swap)
  const balances: bigint[] = new Array(N_COINS)

  for (let i = 0; i < N_COINS; ++i) {
    balances[i] = (await swapContract.getTokenBalance(i)).toBigInt()
  }

  return balances
}
