import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type AdminChanged0Event = ([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})

export type BootstrapSetted0Event = ([tokenA: string, tokenB: string, bootstrap: string] & {tokenA: string, tokenB: string, bootstrap: string})

export type Candidate0Event = ([newAdmin: string] & {newAdmin: string})

export type FeeBasePointUpdated0Event = ([basePoint: number] & {basePoint: number})

export type FeetoUpdated0Event = ([feeto: string] & {feeto: string})

export type PairCreateLocked0Event = ([caller: string] & {caller: string})

export type PairCreateUnlocked0Event = ([caller: string] & {caller: string})

export type PairCreated0Event = ([token0: string, token1: string, pair: string, param: ethers.BigNumber] & {token0: string, token1: string, pair: string, param: ethers.BigNumber})

export interface EvmLog {
  data: string;
  topics: string[];
}

function decodeEvent(signature: string, data: EvmLog): any {
  return abi.decodeEventLog(
    abi.getEvent(signature),
    data.data || "",
    data.topics
  );
}

export const events = {
  "AdminChanged(address,address)": {
    topic: abi.getEventTopic("AdminChanged(address,address)"),
    decode(data: EvmLog): AdminChanged0Event {
      return decodeEvent("AdminChanged(address,address)", data)
    }
  }
  ,
  "BootstrapSetted(address,address,address)": {
    topic: abi.getEventTopic("BootstrapSetted(address,address,address)"),
    decode(data: EvmLog): BootstrapSetted0Event {
      return decodeEvent("BootstrapSetted(address,address,address)", data)
    }
  }
  ,
  "Candidate(address)": {
    topic: abi.getEventTopic("Candidate(address)"),
    decode(data: EvmLog): Candidate0Event {
      return decodeEvent("Candidate(address)", data)
    }
  }
  ,
  "FeeBasePointUpdated(uint8)": {
    topic: abi.getEventTopic("FeeBasePointUpdated(uint8)"),
    decode(data: EvmLog): FeeBasePointUpdated0Event {
      return decodeEvent("FeeBasePointUpdated(uint8)", data)
    }
  }
  ,
  "FeetoUpdated(address)": {
    topic: abi.getEventTopic("FeetoUpdated(address)"),
    decode(data: EvmLog): FeetoUpdated0Event {
      return decodeEvent("FeetoUpdated(address)", data)
    }
  }
  ,
  "PairCreateLocked(address)": {
    topic: abi.getEventTopic("PairCreateLocked(address)"),
    decode(data: EvmLog): PairCreateLocked0Event {
      return decodeEvent("PairCreateLocked(address)", data)
    }
  }
  ,
  "PairCreateUnlocked(address)": {
    topic: abi.getEventTopic("PairCreateUnlocked(address)"),
    decode(data: EvmLog): PairCreateUnlocked0Event {
      return decodeEvent("PairCreateUnlocked(address)", data)
    }
  }
  ,
  "PairCreated(address,address,address,uint256)": {
    topic: abi.getEventTopic("PairCreated(address,address,address,uint256)"),
    decode(data: EvmLog): PairCreated0Event {
      return decodeEvent("PairCreated(address,address,address,uint256)", data)
    }
  }
  ,
}

export type CreatePair0Function = ([tokenA: string, tokenB: string] & {tokenA: string, tokenB: string})

export type SetAdminCandidate0Function = ([_candidate: string] & {_candidate: string})

export type SetBootstrap0Function = ([tokenA: string, tokenB: string, bootstrap: string] & {tokenA: string, tokenB: string, bootstrap: string})

export type SetFeeBasePoint0Function = ([_basePoint: number] & {_basePoint: number})

export type SetFeeto0Function = ([_feeto: string] & {_feeto: string})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "candidateConfirm()": {
    sighash: abi.getSighash("candidateConfirm()"),
  }
  ,
  "createPair(address,address)": {
    sighash: abi.getSighash("createPair(address,address)"),
    decode(input: string): CreatePair0Function {
      return decodeFunction(input)
    }
  }
  ,
  "lockPairCreate()": {
    sighash: abi.getSighash("lockPairCreate()"),
  }
  ,
  "setAdminCandidate(address)": {
    sighash: abi.getSighash("setAdminCandidate(address)"),
    decode(input: string): SetAdminCandidate0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setBootstrap(address,address,address)": {
    sighash: abi.getSighash("setBootstrap(address,address,address)"),
    decode(input: string): SetBootstrap0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFeeBasePoint(uint8)": {
    sighash: abi.getSighash("setFeeBasePoint(uint8)"),
    decode(input: string): SetFeeBasePoint0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFeeto(address)": {
    sighash: abi.getSighash("setFeeto(address)"),
    decode(input: string): SetFeeto0Function {
      return decodeFunction(input)
    }
  }
  ,
  "unlockPairCreate()": {
    sighash: abi.getSighash("unlockPairCreate()"),
  }
  ,
}

interface ChainContext  {
  _chain: Chain
}

interface BlockContext  {
  _chain: Chain
  block: Block
}

interface Block  {
  height: number
}

interface Chain  {
  client:  {
    call: <T=any>(method: string, params?: unknown[]) => Promise<T>
  }
}

export class Contract  {
  private readonly _chain: Chain
  private readonly blockHeight: number
  readonly address: string

  constructor(ctx: BlockContext, address: string)
  constructor(ctx: ChainContext, block: Block, address: string)
  constructor(ctx: BlockContext, blockOrAddress: Block | string, address?: string) {
    this._chain = ctx._chain
    if (typeof blockOrAddress === 'string')  {
      this.blockHeight = ctx.block.height
      this.address = ethers.utils.getAddress(blockOrAddress)
    }
    else  {
      assert(address != null)
      this.blockHeight = blockOrAddress.height
      this.address = ethers.utils.getAddress(address)
    }
  }

  async admin(): Promise<string> {
    return this.call("admin", [])
  }

  async adminCandidate(): Promise<string> {
    return this.call("adminCandidate", [])
  }

  async allPairs(arg0: ethers.BigNumber): Promise<string> {
    return this.call("allPairs", [arg0])
  }

  async allPairsLength(): Promise<ethers.BigNumber> {
    return this.call("allPairsLength", [])
  }

  async feeBasePoint(): Promise<number> {
    return this.call("feeBasePoint", [])
  }

  async feeto(): Promise<string> {
    return this.call("feeto", [])
  }

  async getBootstrap(arg0: string, arg1: string): Promise<string> {
    return this.call("getBootstrap", [arg0, arg1])
  }

  async getPair(arg0: string, arg1: string): Promise<string> {
    return this.call("getPair", [arg0, arg1])
  }

  async lockForPairCreate(): Promise<boolean> {
    return this.call("lockForPairCreate", [])
  }

  async pairCodeHash(): Promise<string> {
    return this.call("pairCodeHash", [])
  }

  private async call(name: string, args: any[]) : Promise<any> {
    const fragment = abi.getFunction(name)
    const data = abi.encodeFunctionData(fragment, args)
    const result = await this._chain.client.call('eth_call', [{to: this.address, data}, this.blockHeight])
    const decoded = abi.decodeFunctionResult(fragment, result)
    return decoded.length > 1 ? decoded : decoded[0]
  }
}

function getJsonAbi(): any {
  return [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldAdmin",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "AdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "bootstrap",
          "type": "address"
        }
      ],
      "name": "BootstrapSetted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "Candidate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "basePoint",
          "type": "uint8"
        }
      ],
      "name": "FeeBasePointUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "feeto",
          "type": "address"
        }
      ],
      "name": "FeetoUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        }
      ],
      "name": "PairCreateLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        }
      ],
      "name": "PairCreateUnlocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token0",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token1",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "pair",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "param",
          "type": "uint256"
        }
      ],
      "name": "PairCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "adminCandidate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allPairs",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "allPairsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "candidateConfirm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
      ],
      "name": "createPair",
      "outputs": [
        {
          "internalType": "address",
          "name": "pair",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeBasePoint",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeto",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "getBootstrap",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "getPair",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lockForPairCreate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lockPairCreate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pairCodeHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_candidate",
          "type": "address"
        }
      ],
      "name": "setAdminCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "bootstrap",
          "type": "address"
        }
      ],
      "name": "setBootstrap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_basePoint",
          "type": "uint8"
        }
      ],
      "name": "setFeeBasePoint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeto",
          "type": "address"
        }
      ],
      "name": "setFeeto",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unlockPairCreate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
