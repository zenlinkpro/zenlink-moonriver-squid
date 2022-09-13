import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type Approval0Event = ([owner: string, spender: string, value: ethers.BigNumber] & {owner: string, spender: string, value: ethers.BigNumber})

export type Burn0Event = ([sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, to: string] & {sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber, to: string})

export type Mint0Event = ([sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber] & {sender: string, amount0: ethers.BigNumber, amount1: ethers.BigNumber})

export type Swap0Event = ([sender: string, amount0In: ethers.BigNumber, amount1In: ethers.BigNumber, amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string] & {sender: string, amount0In: ethers.BigNumber, amount1In: ethers.BigNumber, amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string})

export type Sync0Event = ([reserve0: ethers.BigNumber, reserve1: ethers.BigNumber] & {reserve0: ethers.BigNumber, reserve1: ethers.BigNumber})

export type Transfer0Event = ([from: string, to: string, value: ethers.BigNumber] & {from: string, to: string, value: ethers.BigNumber})

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
  "Approval(address,address,uint256)": {
    topic: abi.getEventTopic("Approval(address,address,uint256)"),
    decode(data: EvmLog): Approval0Event {
      return decodeEvent("Approval(address,address,uint256)", data)
    }
  }
  ,
  "Burn(address,uint256,uint256,address)": {
    topic: abi.getEventTopic("Burn(address,uint256,uint256,address)"),
    decode(data: EvmLog): Burn0Event {
      return decodeEvent("Burn(address,uint256,uint256,address)", data)
    }
  }
  ,
  "Mint(address,uint256,uint256)": {
    topic: abi.getEventTopic("Mint(address,uint256,uint256)"),
    decode(data: EvmLog): Mint0Event {
      return decodeEvent("Mint(address,uint256,uint256)", data)
    }
  }
  ,
  "Swap(address,uint256,uint256,uint256,uint256,address)": {
    topic: abi.getEventTopic("Swap(address,uint256,uint256,uint256,uint256,address)"),
    decode(data: EvmLog): Swap0Event {
      return decodeEvent("Swap(address,uint256,uint256,uint256,uint256,address)", data)
    }
  }
  ,
  "Sync(uint112,uint112)": {
    topic: abi.getEventTopic("Sync(uint112,uint112)"),
    decode(data: EvmLog): Sync0Event {
      return decodeEvent("Sync(uint112,uint112)", data)
    }
  }
  ,
  "Transfer(address,address,uint256)": {
    topic: abi.getEventTopic("Transfer(address,address,uint256)"),
    decode(data: EvmLog): Transfer0Event {
      return decodeEvent("Transfer(address,address,uint256)", data)
    }
  }
  ,
}

export type Approve0Function = ([spender: string, amount: ethers.BigNumber] & {spender: string, amount: ethers.BigNumber})

export type Burn0Function = ([to: string] & {to: string})

export type DecreaseAllowance0Function = ([spender: string, subtractedValue: ethers.BigNumber] & {spender: string, subtractedValue: ethers.BigNumber})

export type IncreaseAllowance0Function = ([spender: string, addedValue: ethers.BigNumber] & {spender: string, addedValue: ethers.BigNumber})

export type Initialize0Function = ([_token0: string, _token1: string] & {_token0: string, _token1: string})

export type Mint0Function = ([to: string] & {to: string})

export type Permit0Function = ([owner: string, spender: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string] & {owner: string, spender: string, value: ethers.BigNumber, deadline: ethers.BigNumber, v: number, r: string, s: string})

export type Skim0Function = ([to: string] & {to: string})

export type Swap0Function = ([amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string, data: string] & {amount0Out: ethers.BigNumber, amount1Out: ethers.BigNumber, to: string, data: string})

export type Transfer0Function = ([to: string, amount: ethers.BigNumber] & {to: string, amount: ethers.BigNumber})

export type TransferFrom0Function = ([from: string, to: string, amount: ethers.BigNumber] & {from: string, to: string, amount: ethers.BigNumber})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "approve(address,uint256)": {
    sighash: abi.getSighash("approve(address,uint256)"),
    decode(input: string): Approve0Function {
      return decodeFunction(input)
    }
  }
  ,
  "burn(address)": {
    sighash: abi.getSighash("burn(address)"),
    decode(input: string): Burn0Function {
      return decodeFunction(input)
    }
  }
  ,
  "decreaseAllowance(address,uint256)": {
    sighash: abi.getSighash("decreaseAllowance(address,uint256)"),
    decode(input: string): DecreaseAllowance0Function {
      return decodeFunction(input)
    }
  }
  ,
  "increaseAllowance(address,uint256)": {
    sighash: abi.getSighash("increaseAllowance(address,uint256)"),
    decode(input: string): IncreaseAllowance0Function {
      return decodeFunction(input)
    }
  }
  ,
  "initialize(address,address)": {
    sighash: abi.getSighash("initialize(address,address)"),
    decode(input: string): Initialize0Function {
      return decodeFunction(input)
    }
  }
  ,
  "mint(address)": {
    sighash: abi.getSighash("mint(address)"),
    decode(input: string): Mint0Function {
      return decodeFunction(input)
    }
  }
  ,
  "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": {
    sighash: abi.getSighash("permit(address,address,uint256,uint256,uint8,bytes32,bytes32)"),
    decode(input: string): Permit0Function {
      return decodeFunction(input)
    }
  }
  ,
  "skim(address)": {
    sighash: abi.getSighash("skim(address)"),
    decode(input: string): Skim0Function {
      return decodeFunction(input)
    }
  }
  ,
  "swap(uint256,uint256,address,bytes)": {
    sighash: abi.getSighash("swap(uint256,uint256,address,bytes)"),
    decode(input: string): Swap0Function {
      return decodeFunction(input)
    }
  }
  ,
  "sync()": {
    sighash: abi.getSighash("sync()"),
  }
  ,
  "transfer(address,uint256)": {
    sighash: abi.getSighash("transfer(address,uint256)"),
    decode(input: string): Transfer0Function {
      return decodeFunction(input)
    }
  }
  ,
  "transferFrom(address,address,uint256)": {
    sighash: abi.getSighash("transferFrom(address,address,uint256)"),
    decode(input: string): TransferFrom0Function {
      return decodeFunction(input)
    }
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

  async DOMAIN_SEPARATOR(): Promise<string> {
    return this.call("DOMAIN_SEPARATOR", [])
  }

  async MINIMUM_LIQUIDITY(): Promise<ethers.BigNumber> {
    return this.call("MINIMUM_LIQUIDITY", [])
  }

  async PERMIT_TYPEHASH(): Promise<string> {
    return this.call("PERMIT_TYPEHASH", [])
  }

  async allowance(owner: string, spender: string): Promise<ethers.BigNumber> {
    return this.call("allowance", [owner, spender])
  }

  async balanceOf(account: string): Promise<ethers.BigNumber> {
    return this.call("balanceOf", [account])
  }

  async decimals(): Promise<number> {
    return this.call("decimals", [])
  }

  async factory(): Promise<string> {
    return this.call("factory", [])
  }

  async getReserves(): Promise<([_reserve0: ethers.BigNumber, _reserve1: ethers.BigNumber, _blockTimestampLast: number] & {_reserve0: ethers.BigNumber, _reserve1: ethers.BigNumber, _blockTimestampLast: number})> {
    return this.call("getReserves", [])
  }

  async kLast(): Promise<ethers.BigNumber> {
    return this.call("kLast", [])
  }

  async name(): Promise<string> {
    return this.call("name", [])
  }

  async nonces(arg0: string): Promise<ethers.BigNumber> {
    return this.call("nonces", [arg0])
  }

  async price0CumulativeLast(): Promise<ethers.BigNumber> {
    return this.call("price0CumulativeLast", [])
  }

  async price1CumulativeLast(): Promise<ethers.BigNumber> {
    return this.call("price1CumulativeLast", [])
  }

  async symbol(): Promise<string> {
    return this.call("symbol", [])
  }

  async token0(): Promise<string> {
    return this.call("token0", [])
  }

  async token1(): Promise<string> {
    return this.call("token1", [])
  }

  async totalSupply(): Promise<ethers.BigNumber> {
    return this.call("totalSupply", [])
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
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve1",
          "type": "uint112"
        }
      ],
      "name": "Sync",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINIMUM_LIQUIDITY",
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
      "name": "PERMIT_TYPEHASH",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
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
      "name": "getReserves",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "_reserve0",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "_reserve1",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "_blockTimestampLast",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_token1",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "kLast",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
        }
      ],
      "name": "nonces",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "price0CumulativeLast",
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
      "name": "price1CumulativeLast",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "skim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sync",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token0",
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
      "name": "token1",
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
      "name": "totalSupply",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
