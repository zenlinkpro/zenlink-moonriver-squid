import type {Result, Option} from './support'

export interface EvmLog {
  address: Uint8Array
  topics: Uint8Array[]
  data: Uint8Array
}
