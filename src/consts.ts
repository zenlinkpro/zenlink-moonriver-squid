import { Big as BigDecimal } from 'big.js'

export const knownContracts: ReadonlyArray<string> = []

export const CHAIN_NODE = 'wss://rpc.astar.network'

// need to be lowercase
export const FACTORY_ADDRESS = '0x7bae21fb8408d534adfefcb46371c3576a1d5717'
export const FOUR_POOL = '0xb0fa056fffb74c0fb215f86d691c94ed45b686aa'
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
