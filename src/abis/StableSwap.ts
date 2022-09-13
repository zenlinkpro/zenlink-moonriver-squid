import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type AddLiquidity0Event = ([provider: string, tokenAmounts: Array<ethers.BigNumber>, fees: Array<ethers.BigNumber>, invariant: ethers.BigNumber, tokenSupply: ethers.BigNumber] & {provider: string, tokenAmounts: Array<ethers.BigNumber>, fees: Array<ethers.BigNumber>, invariant: ethers.BigNumber, tokenSupply: ethers.BigNumber})

export type AdminChanged0Event = ([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})

export type Candidate0Event = ([newAdmin: string] & {newAdmin: string})

export type CollectProtocolFee0Event = ([token: string, amount: ethers.BigNumber] & {token: string, amount: ethers.BigNumber})

export type FeeControllerChanged0Event = ([newController: string] & {newController: string})

export type FeeDistributorChanged0Event = ([newController: string] & {newController: string})

export type FlashLoan0Event = ([caller: string, receiver: string, amounts_out: Array<ethers.BigNumber>] & {caller: string, receiver: string, amounts_out: Array<ethers.BigNumber>})

export type Initialized0Event = ([version: number] & {version: number})

export type NewFee0Event = ([fee: ethers.BigNumber, adminFee: ethers.BigNumber] & {fee: ethers.BigNumber, adminFee: ethers.BigNumber})

export type Paused0Event = ([account: string] & {account: string})

export type RampA0Event = ([oldA: ethers.BigNumber, newA: ethers.BigNumber, initialTime: ethers.BigNumber, futureTime: ethers.BigNumber] & {oldA: ethers.BigNumber, newA: ethers.BigNumber, initialTime: ethers.BigNumber, futureTime: ethers.BigNumber})

export type RemoveLiquidity0Event = ([provider: string, tokenAmounts: Array<ethers.BigNumber>, fees: Array<ethers.BigNumber>, tokenSupply: ethers.BigNumber] & {provider: string, tokenAmounts: Array<ethers.BigNumber>, fees: Array<ethers.BigNumber>, tokenSupply: ethers.BigNumber})

export type RemoveLiquidityImbalance0Event = ([provider: string, tokenAmounts: Array<ethers.BigNumber>, fees: Array<ethers.BigNumber>, invariant: ethers.BigNumber, tokenSupply: ethers.BigNumber] & {provider: string, tokenAmounts: Array<ethers.BigNumber>, fees: Array<ethers.BigNumber>, invariant: ethers.BigNumber, tokenSupply: ethers.BigNumber})

export type RemoveLiquidityOne0Event = ([provider: string, tokenIndex: ethers.BigNumber, tokenAmount: ethers.BigNumber, coinAmount: ethers.BigNumber] & {provider: string, tokenIndex: ethers.BigNumber, tokenAmount: ethers.BigNumber, coinAmount: ethers.BigNumber})

export type StopRampA0Event = ([A: ethers.BigNumber, timestamp: ethers.BigNumber] & {A: ethers.BigNumber, timestamp: ethers.BigNumber})

export type TokenExchange0Event = ([buyer: string, soldId: ethers.BigNumber, tokensSold: ethers.BigNumber, boughtId: ethers.BigNumber, tokensBought: ethers.BigNumber] & {buyer: string, soldId: ethers.BigNumber, tokensSold: ethers.BigNumber, boughtId: ethers.BigNumber, tokensBought: ethers.BigNumber})

export type Unpaused0Event = ([account: string] & {account: string})

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
  "AddLiquidity(address,uint256[],uint256[],uint256,uint256)": {
    topic: abi.getEventTopic("AddLiquidity(address,uint256[],uint256[],uint256,uint256)"),
    decode(data: EvmLog): AddLiquidity0Event {
      return decodeEvent("AddLiquidity(address,uint256[],uint256[],uint256,uint256)", data)
    }
  }
  ,
  "AdminChanged(address,address)": {
    topic: abi.getEventTopic("AdminChanged(address,address)"),
    decode(data: EvmLog): AdminChanged0Event {
      return decodeEvent("AdminChanged(address,address)", data)
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
  "CollectProtocolFee(address,uint256)": {
    topic: abi.getEventTopic("CollectProtocolFee(address,uint256)"),
    decode(data: EvmLog): CollectProtocolFee0Event {
      return decodeEvent("CollectProtocolFee(address,uint256)", data)
    }
  }
  ,
  "FeeControllerChanged(address)": {
    topic: abi.getEventTopic("FeeControllerChanged(address)"),
    decode(data: EvmLog): FeeControllerChanged0Event {
      return decodeEvent("FeeControllerChanged(address)", data)
    }
  }
  ,
  "FeeDistributorChanged(address)": {
    topic: abi.getEventTopic("FeeDistributorChanged(address)"),
    decode(data: EvmLog): FeeDistributorChanged0Event {
      return decodeEvent("FeeDistributorChanged(address)", data)
    }
  }
  ,
  "FlashLoan(address,address,uint256[])": {
    topic: abi.getEventTopic("FlashLoan(address,address,uint256[])"),
    decode(data: EvmLog): FlashLoan0Event {
      return decodeEvent("FlashLoan(address,address,uint256[])", data)
    }
  }
  ,
  "Initialized(uint8)": {
    topic: abi.getEventTopic("Initialized(uint8)"),
    decode(data: EvmLog): Initialized0Event {
      return decodeEvent("Initialized(uint8)", data)
    }
  }
  ,
  "NewFee(uint256,uint256)": {
    topic: abi.getEventTopic("NewFee(uint256,uint256)"),
    decode(data: EvmLog): NewFee0Event {
      return decodeEvent("NewFee(uint256,uint256)", data)
    }
  }
  ,
  "Paused(address)": {
    topic: abi.getEventTopic("Paused(address)"),
    decode(data: EvmLog): Paused0Event {
      return decodeEvent("Paused(address)", data)
    }
  }
  ,
  "RampA(uint256,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("RampA(uint256,uint256,uint256,uint256)"),
    decode(data: EvmLog): RampA0Event {
      return decodeEvent("RampA(uint256,uint256,uint256,uint256)", data)
    }
  }
  ,
  "RemoveLiquidity(address,uint256[],uint256[],uint256)": {
    topic: abi.getEventTopic("RemoveLiquidity(address,uint256[],uint256[],uint256)"),
    decode(data: EvmLog): RemoveLiquidity0Event {
      return decodeEvent("RemoveLiquidity(address,uint256[],uint256[],uint256)", data)
    }
  }
  ,
  "RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)": {
    topic: abi.getEventTopic("RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)"),
    decode(data: EvmLog): RemoveLiquidityImbalance0Event {
      return decodeEvent("RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)", data)
    }
  }
  ,
  "RemoveLiquidityOne(address,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("RemoveLiquidityOne(address,uint256,uint256,uint256)"),
    decode(data: EvmLog): RemoveLiquidityOne0Event {
      return decodeEvent("RemoveLiquidityOne(address,uint256,uint256,uint256)", data)
    }
  }
  ,
  "StopRampA(uint256,uint256)": {
    topic: abi.getEventTopic("StopRampA(uint256,uint256)"),
    decode(data: EvmLog): StopRampA0Event {
      return decodeEvent("StopRampA(uint256,uint256)", data)
    }
  }
  ,
  "TokenExchange(address,uint256,uint256,uint256,uint256)": {
    topic: abi.getEventTopic("TokenExchange(address,uint256,uint256,uint256,uint256)"),
    decode(data: EvmLog): TokenExchange0Event {
      return decodeEvent("TokenExchange(address,uint256,uint256,uint256,uint256)", data)
    }
  }
  ,
  "Unpaused(address)": {
    topic: abi.getEventTopic("Unpaused(address)"),
    decode(data: EvmLog): Unpaused0Event {
      return decodeEvent("Unpaused(address)", data)
    }
  }
  ,
}

export type AddLiquidity0Function = ([amounts: Array<ethers.BigNumber>, minMintAmount: ethers.BigNumber, deadline: ethers.BigNumber] & {amounts: Array<ethers.BigNumber>, minMintAmount: ethers.BigNumber, deadline: ethers.BigNumber})

export type FlashLoan0Function = ([amountsOut: Array<ethers.BigNumber>, to: string, data: string, deadline: ethers.BigNumber] & {amountsOut: Array<ethers.BigNumber>, to: string, data: string, deadline: ethers.BigNumber})

export type Initialize0Function = ([_coins: Array<string>, _decimals: Array<number>, lpTokenName: string, lpTokenSymbol: string, _A: ethers.BigNumber, _fee: ethers.BigNumber, _adminFee: ethers.BigNumber, _feeDistributor: string] & {_coins: Array<string>, _decimals: Array<number>, lpTokenName: string, lpTokenSymbol: string, _A: ethers.BigNumber, _fee: ethers.BigNumber, _adminFee: ethers.BigNumber, _feeDistributor: string})

export type RampA0Function = ([futureA: ethers.BigNumber, futureATime: ethers.BigNumber] & {futureA: ethers.BigNumber, futureATime: ethers.BigNumber})

export type RemoveLiquidity0Function = ([lpAmount: ethers.BigNumber, minAmounts: Array<ethers.BigNumber>, deadline: ethers.BigNumber] & {lpAmount: ethers.BigNumber, minAmounts: Array<ethers.BigNumber>, deadline: ethers.BigNumber})

export type RemoveLiquidityImbalance0Function = ([amounts: Array<ethers.BigNumber>, maxBurnAmount: ethers.BigNumber, deadline: ethers.BigNumber] & {amounts: Array<ethers.BigNumber>, maxBurnAmount: ethers.BigNumber, deadline: ethers.BigNumber})

export type RemoveLiquidityOneToken0Function = ([lpAmount: ethers.BigNumber, index: number, minAmount: ethers.BigNumber, deadline: ethers.BigNumber] & {lpAmount: ethers.BigNumber, index: number, minAmount: ethers.BigNumber, deadline: ethers.BigNumber})

export type SetAdminCandidate0Function = ([_candidate: string] & {_candidate: string})

export type SetFee0Function = ([newSwapFee: ethers.BigNumber, newAdminFee: ethers.BigNumber] & {newSwapFee: ethers.BigNumber, newAdminFee: ethers.BigNumber})

export type SetFeeController0Function = ([_feeController: string] & {_feeController: string})

export type SetFeeDistributor0Function = ([_feeDistributor: string] & {_feeDistributor: string})

export type Swap0Function = ([fromIndex: number, toIndex: number, inAmount: ethers.BigNumber, minOutAmount: ethers.BigNumber, deadline: ethers.BigNumber] & {fromIndex: number, toIndex: number, inAmount: ethers.BigNumber, minOutAmount: ethers.BigNumber, deadline: ethers.BigNumber})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "addLiquidity(uint256[],uint256,uint256)": {
    sighash: abi.getSighash("addLiquidity(uint256[],uint256,uint256)"),
    decode(input: string): AddLiquidity0Function {
      return decodeFunction(input)
    }
  }
  ,
  "candidateConfirm()": {
    sighash: abi.getSighash("candidateConfirm()"),
  }
  ,
  "flashLoan(uint256[],address,bytes,uint256)": {
    sighash: abi.getSighash("flashLoan(uint256[],address,bytes,uint256)"),
    decode(input: string): FlashLoan0Function {
      return decodeFunction(input)
    }
  }
  ,
  "initialize(address[],uint8[],string,string,uint256,uint256,uint256,address)": {
    sighash: abi.getSighash("initialize(address[],uint8[],string,string,uint256,uint256,uint256,address)"),
    decode(input: string): Initialize0Function {
      return decodeFunction(input)
    }
  }
  ,
  "pause()": {
    sighash: abi.getSighash("pause()"),
  }
  ,
  "rampA(uint256,uint256)": {
    sighash: abi.getSighash("rampA(uint256,uint256)"),
    decode(input: string): RampA0Function {
      return decodeFunction(input)
    }
  }
  ,
  "removeLiquidity(uint256,uint256[],uint256)": {
    sighash: abi.getSighash("removeLiquidity(uint256,uint256[],uint256)"),
    decode(input: string): RemoveLiquidity0Function {
      return decodeFunction(input)
    }
  }
  ,
  "removeLiquidityImbalance(uint256[],uint256,uint256)": {
    sighash: abi.getSighash("removeLiquidityImbalance(uint256[],uint256,uint256)"),
    decode(input: string): RemoveLiquidityImbalance0Function {
      return decodeFunction(input)
    }
  }
  ,
  "removeLiquidityOneToken(uint256,uint8,uint256,uint256)": {
    sighash: abi.getSighash("removeLiquidityOneToken(uint256,uint8,uint256,uint256)"),
    decode(input: string): RemoveLiquidityOneToken0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setAdminCandidate(address)": {
    sighash: abi.getSighash("setAdminCandidate(address)"),
    decode(input: string): SetAdminCandidate0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFee(uint256,uint256)": {
    sighash: abi.getSighash("setFee(uint256,uint256)"),
    decode(input: string): SetFee0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFeeController(address)": {
    sighash: abi.getSighash("setFeeController(address)"),
    decode(input: string): SetFeeController0Function {
      return decodeFunction(input)
    }
  }
  ,
  "setFeeDistributor(address)": {
    sighash: abi.getSighash("setFeeDistributor(address)"),
    decode(input: string): SetFeeDistributor0Function {
      return decodeFunction(input)
    }
  }
  ,
  "stopRampA()": {
    sighash: abi.getSighash("stopRampA()"),
  }
  ,
  "swap(uint8,uint8,uint256,uint256,uint256)": {
    sighash: abi.getSighash("swap(uint8,uint8,uint256,uint256,uint256)"),
    decode(input: string): Swap0Function {
      return decodeFunction(input)
    }
  }
  ,
  "unpause()": {
    sighash: abi.getSighash("unpause()"),
  }
  ,
  "withdrawAdminFee()": {
    sighash: abi.getSighash("withdrawAdminFee()"),
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

  async MAX_A(): Promise<ethers.BigNumber> {
    return this.call("MAX_A", [])
  }

  async MAX_ADMIN_FEE(): Promise<ethers.BigNumber> {
    return this.call("MAX_ADMIN_FEE", [])
  }

  async MAX_A_CHANGE(): Promise<ethers.BigNumber> {
    return this.call("MAX_A_CHANGE", [])
  }

  async MAX_SWAP_FEE(): Promise<ethers.BigNumber> {
    return this.call("MAX_SWAP_FEE", [])
  }

  async MIN_RAMP_TIME(): Promise<ethers.BigNumber> {
    return this.call("MIN_RAMP_TIME", [])
  }

  async admin(): Promise<string> {
    return this.call("admin", [])
  }

  async adminCandidate(): Promise<string> {
    return this.call("adminCandidate", [])
  }

  async calculateRemoveLiquidity(amount: ethers.BigNumber): Promise<Array<ethers.BigNumber>> {
    return this.call("calculateRemoveLiquidity", [amount])
  }

  async calculateRemoveLiquidityOneToken(amount: ethers.BigNumber, index: number): Promise<ethers.BigNumber> {
    return this.call("calculateRemoveLiquidityOneToken", [amount, index])
  }

  async calculateSwap(inIndex: number, outIndex: number, inAmount: ethers.BigNumber): Promise<ethers.BigNumber> {
    return this.call("calculateSwap", [inIndex, outIndex, inAmount])
  }

  async calculateTokenAmount(amounts: Array<ethers.BigNumber>, deposit: boolean): Promise<ethers.BigNumber> {
    return this.call("calculateTokenAmount", [amounts, deposit])
  }

  async feeController(): Promise<string> {
    return this.call("feeController", [])
  }

  async feeDistributor(): Promise<string> {
    return this.call("feeDistributor", [])
  }

  async getA(): Promise<ethers.BigNumber> {
    return this.call("getA", [])
  }

  async getAPrecise(): Promise<ethers.BigNumber> {
    return this.call("getAPrecise", [])
  }

  async getAdminBalance(index: number): Promise<ethers.BigNumber> {
    return this.call("getAdminBalance", [index])
  }

  async getAdminBalances(): Promise<Array<ethers.BigNumber>> {
    return this.call("getAdminBalances", [])
  }

  async getLpToken(): Promise<string> {
    return this.call("getLpToken", [])
  }

  async getNumberOfTokens(): Promise<ethers.BigNumber> {
    return this.call("getNumberOfTokens", [])
  }

  async getToken(index: number): Promise<string> {
    return this.call("getToken", [index])
  }

  async getTokenBalance(index: number): Promise<ethers.BigNumber> {
    return this.call("getTokenBalance", [index])
  }

  async getTokenBalances(): Promise<Array<ethers.BigNumber>> {
    return this.call("getTokenBalances", [])
  }

  async getTokenIndex(token: string): Promise<number> {
    return this.call("getTokenIndex", [token])
  }

  async getTokenPrecisionMultipliers(): Promise<Array<ethers.BigNumber>> {
    return this.call("getTokenPrecisionMultipliers", [])
  }

  async getTokens(): Promise<Array<string>> {
    return this.call("getTokens", [])
  }

  async getVirtualPrice(): Promise<ethers.BigNumber> {
    return this.call("getVirtualPrice", [])
  }

  async paused(): Promise<boolean> {
    return this.call("paused", [])
  }

  async swapStorage(): Promise<([lpToken: string, fee: ethers.BigNumber, adminFee: ethers.BigNumber, initialA: ethers.BigNumber, futureA: ethers.BigNumber, initialATime: ethers.BigNumber, futureATime: ethers.BigNumber] & {lpToken: string, fee: ethers.BigNumber, adminFee: ethers.BigNumber, initialA: ethers.BigNumber, futureA: ethers.BigNumber, initialATime: ethers.BigNumber, futureATime: ethers.BigNumber})> {
    return this.call("swapStorage", [])
  }

  async tokenIndexes(arg0: string): Promise<number> {
    return this.call("tokenIndexes", [arg0])
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
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "tokenAmounts",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "fees",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "invariant",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenSupply",
          "type": "uint256"
        }
      ],
      "name": "AddLiquidity",
      "type": "event"
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
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CollectProtocolFee",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newController",
          "type": "address"
        }
      ],
      "name": "FeeControllerChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "newController",
          "type": "address"
        }
      ],
      "name": "FeeDistributorChanged",
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
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "amounts_out",
          "type": "uint256[]"
        }
      ],
      "name": "FlashLoan",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "adminFee",
          "type": "uint256"
        }
      ],
      "name": "NewFee",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldA",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newA",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "initialTime",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "futureTime",
          "type": "uint256"
        }
      ],
      "name": "RampA",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "tokenAmounts",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "fees",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenSupply",
          "type": "uint256"
        }
      ],
      "name": "RemoveLiquidity",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "tokenAmounts",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "fees",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "invariant",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenSupply",
          "type": "uint256"
        }
      ],
      "name": "RemoveLiquidityImbalance",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "coinAmount",
          "type": "uint256"
        }
      ],
      "name": "RemoveLiquidityOne",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "A",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "StopRampA",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "soldId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensSold",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "boughtId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensBought",
          "type": "uint256"
        }
      ],
      "name": "TokenExchange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MAX_A",
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
      "name": "MAX_ADMIN_FEE",
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
      "name": "MAX_A_CHANGE",
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
      "name": "MAX_SWAP_FEE",
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
      "name": "MIN_RAMP_TIME",
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
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "minMintAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "calculateRemoveLiquidity",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "calculateRemoveLiquidityOneToken",
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
          "internalType": "uint8",
          "name": "inIndex",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "outIndex",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "inAmount",
          "type": "uint256"
        }
      ],
      "name": "calculateSwap",
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
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "bool",
          "name": "deposit",
          "type": "bool"
        }
      ],
      "name": "calculateTokenAmount",
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
      "inputs": [],
      "name": "feeController",
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
      "name": "feeDistributor",
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
          "internalType": "uint256[]",
          "name": "amountsOut",
          "type": "uint256[]"
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
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "flashLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getA",
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
      "name": "getAPrecise",
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
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getAdminBalance",
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
      "name": "getAdminBalances",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "adminBalances",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLpToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumberOfTokens",
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
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
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
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getTokenBalance",
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
      "name": "getTokenBalances",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getTokenIndex",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenPrecisionMultipliers",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokens",
      "outputs": [
        {
          "internalType": "contract IERC20[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVirtualPrice",
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
          "internalType": "address[]",
          "name": "_coins",
          "type": "address[]"
        },
        {
          "internalType": "uint8[]",
          "name": "_decimals",
          "type": "uint8[]"
        },
        {
          "internalType": "string",
          "name": "lpTokenName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "lpTokenSymbol",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_A",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_adminFee",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_feeDistributor",
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
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "futureA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "futureATime",
          "type": "uint256"
        }
      ],
      "name": "rampA",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "lpAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "minAmounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidity",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "maxBurnAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidityImbalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "lpAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "minAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidityOneToken",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
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
          "internalType": "uint256",
          "name": "newSwapFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newAdminFee",
          "type": "uint256"
        }
      ],
      "name": "setFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeController",
          "type": "address"
        }
      ],
      "name": "setFeeController",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeDistributor",
          "type": "address"
        }
      ],
      "name": "setFeeDistributor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stopRampA",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "fromIndex",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "toIndex",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "inAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "minOutAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "swapStorage",
      "outputs": [
        {
          "internalType": "contract LPToken",
          "name": "lpToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "adminFee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "initialA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "futureA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "initialATime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "futureATime",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "tokenIndexes",
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
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawAdminFee",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
