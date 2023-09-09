import { Big as BigDecimal } from 'big.js'

export const knownContracts: ReadonlyArray<string> = []

export const CHAIN_NODE = process.env.CHAIN_NODE || 'https://moonriver.api.onfinality.io/public'

// need to be lowercase
export const FACTORY_ADDRESS = '0x28Eaa01DC747C4e9D37c5ca473E7d167E90F8d38'.toLowerCase()
export const FOUR_POOL = '0x7BDE79AD4ae9023AC771F435A1DC6efdF3F434D1'.toLowerCase()
export const FOUR_POOL_LP = '0x569b9459db9bcd5964f0c9bdbaa2416722a4bd1a'.toLowerCase()
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const FARMING_ADDRESS = '0xf4ec122d32f2117674ce127b72c40506c52a72f8'.toLowerCase()

export const ZERO_BI = 0n
export const ONE_BI = 1n
export const ZERO_BD = BigDecimal(0)
export const ONE_BD = BigDecimal(1)
export const BI_18 = 1000000000000000000n
