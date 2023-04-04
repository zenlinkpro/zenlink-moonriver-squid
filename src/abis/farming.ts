import * as ethers from "ethers";
import assert from "assert";

export const abi = new ethers.utils.Interface(getJsonAbi());

export type AdminChanged0Event = ([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})

export type Candidate0Event = ([newAdmin: string] & {newAdmin: string})

export type Charged0Event = ([pid: ethers.BigNumber, rewards: Array<string>, amounts: Array<ethers.BigNumber>] & {pid: ethers.BigNumber, rewards: Array<string>, amounts: Array<ethers.BigNumber>})

export type Claim0Event = ([user: string, pid: ethers.BigNumber, rewards: Array<string>, amounts: Array<ethers.BigNumber>] & {user: string, pid: ethers.BigNumber, rewards: Array<string>, amounts: Array<ethers.BigNumber>})

export type ClaimableBlockUpdated0Event = ([pid: ethers.BigNumber, interval: ethers.BigNumber] & {pid: ethers.BigNumber, interval: ethers.BigNumber})

export type EmergencyWithdraw0Event = ([user: string, pid: ethers.BigNumber, amount: ethers.BigNumber] & {user: string, pid: ethers.BigNumber, amount: ethers.BigNumber})

export type PoolAdded0Event = ([farmingToken: string] & {farmingToken: string})

export type Redeem0Event = ([user: string, pid: ethers.BigNumber, amount: ethers.BigNumber] & {user: string, pid: ethers.BigNumber, amount: ethers.BigNumber})

export type Stake0Event = ([user: string, pid: ethers.BigNumber, amount: ethers.BigNumber] & {user: string, pid: ethers.BigNumber, amount: ethers.BigNumber})

export type WithdrawRewards0Event = ([pid: ethers.BigNumber, rewards: Array<string>, amounts: Array<ethers.BigNumber>] & {pid: ethers.BigNumber, rewards: Array<string>, amounts: Array<ethers.BigNumber>})

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
  "Candidate(address)": {
    topic: abi.getEventTopic("Candidate(address)"),
    decode(data: EvmLog): Candidate0Event {
      return decodeEvent("Candidate(address)", data)
    }
  }
  ,
  "Charged(uint256,address[],uint256[])": {
    topic: abi.getEventTopic("Charged(uint256,address[],uint256[])"),
    decode(data: EvmLog): Charged0Event {
      return decodeEvent("Charged(uint256,address[],uint256[])", data)
    }
  }
  ,
  "Claim(address,uint256,address[],uint256[])": {
    topic: abi.getEventTopic("Claim(address,uint256,address[],uint256[])"),
    decode(data: EvmLog): Claim0Event {
      return decodeEvent("Claim(address,uint256,address[],uint256[])", data)
    }
  }
  ,
  "ClaimableBlockUpdated(uint256,uint256)": {
    topic: abi.getEventTopic("ClaimableBlockUpdated(uint256,uint256)"),
    decode(data: EvmLog): ClaimableBlockUpdated0Event {
      return decodeEvent("ClaimableBlockUpdated(uint256,uint256)", data)
    }
  }
  ,
  "EmergencyWithdraw(address,uint256,uint256)": {
    topic: abi.getEventTopic("EmergencyWithdraw(address,uint256,uint256)"),
    decode(data: EvmLog): EmergencyWithdraw0Event {
      return decodeEvent("EmergencyWithdraw(address,uint256,uint256)", data)
    }
  }
  ,
  "PoolAdded(address)": {
    topic: abi.getEventTopic("PoolAdded(address)"),
    decode(data: EvmLog): PoolAdded0Event {
      return decodeEvent("PoolAdded(address)", data)
    }
  }
  ,
  "Redeem(address,uint256,uint256)": {
    topic: abi.getEventTopic("Redeem(address,uint256,uint256)"),
    decode(data: EvmLog): Redeem0Event {
      return decodeEvent("Redeem(address,uint256,uint256)", data)
    }
  }
  ,
  "Stake(address,uint256,uint256)": {
    topic: abi.getEventTopic("Stake(address,uint256,uint256)"),
    decode(data: EvmLog): Stake0Event {
      return decodeEvent("Stake(address,uint256,uint256)", data)
    }
  }
  ,
  "WithdrawRewards(uint256,address[],uint256[])": {
    topic: abi.getEventTopic("WithdrawRewards(uint256,address[],uint256[])"),
    decode(data: EvmLog): WithdrawRewards0Event {
      return decodeEvent("WithdrawRewards(uint256,address[],uint256[])", data)
    }
  }
  ,
}

export type Add0Function = ([_farmingToken: string, _rewardTokens: Array<string>, _rewardPerBlock: Array<ethers.BigNumber>, _startBlock: ethers.BigNumber, _claimableInterval: ethers.BigNumber] & {_farmingToken: string, _rewardTokens: Array<string>, _rewardPerBlock: Array<ethers.BigNumber>, _startBlock: ethers.BigNumber, _claimableInterval: ethers.BigNumber})

export type Charge0Function = ([_pid: ethers.BigNumber, _amounts: Array<ethers.BigNumber>] & {_pid: ethers.BigNumber, _amounts: Array<ethers.BigNumber>})

export type Claim0Function = ([_pid: ethers.BigNumber] & {_pid: ethers.BigNumber})

export type EmergencyWithdraw0Function = ([_pid: ethers.BigNumber] & {_pid: ethers.BigNumber})

export type Redeem0Function = ([_pid: ethers.BigNumber, _farmingToken: string, _amount: ethers.BigNumber] & {_pid: ethers.BigNumber, _farmingToken: string, _amount: ethers.BigNumber})

export type Set0Function = ([_pid: ethers.BigNumber, _rewardPerBlock: Array<ethers.BigNumber>, _withUpdate: boolean] & {_pid: ethers.BigNumber, _rewardPerBlock: Array<ethers.BigNumber>, _withUpdate: boolean})

export type SetAdminCandidate0Function = ([_candidate: string] & {_candidate: string})

export type SetClaimableBlock0Function = ([_pid: ethers.BigNumber, _interval: ethers.BigNumber] & {_pid: ethers.BigNumber, _interval: ethers.BigNumber})

export type Stake0Function = ([_pid: ethers.BigNumber, _farmingToken: string, _amount: ethers.BigNumber] & {_pid: ethers.BigNumber, _farmingToken: string, _amount: ethers.BigNumber})

export type UpdatePool0Function = ([_pid: ethers.BigNumber] & {_pid: ethers.BigNumber})

export type WithdrawRewards0Function = ([_pid: ethers.BigNumber, _amounts: Array<ethers.BigNumber>] & {_pid: ethers.BigNumber, _amounts: Array<ethers.BigNumber>})


function decodeFunction(data: string): any {
  return abi.decodeFunctionData(data.slice(0, 10), data)
}

export const functions = {
  "add(address,address[],uint256[],uint256,uint256)": {
    sighash: abi.getSighash("add(address,address[],uint256[],uint256,uint256)"),
    decode(input: string): Add0Function {
      return decodeFunction(input)
    }
  }
  ,
  "candidateConfirm()": {
    sighash: abi.getSighash("candidateConfirm()"),
  }
  ,
  "charge(uint256,uint256[])": {
    sighash: abi.getSighash("charge(uint256,uint256[])"),
    decode(input: string): Charge0Function {
      return decodeFunction(input)
    }
  }
  ,
  "claim(uint256)": {
    sighash: abi.getSighash("claim(uint256)"),
    decode(input: string): Claim0Function {
      return decodeFunction(input)
    }
  }
  ,
  "emergencyWithdraw(uint256)": {
    sighash: abi.getSighash("emergencyWithdraw(uint256)"),
    decode(input: string): EmergencyWithdraw0Function {
      return decodeFunction(input)
    }
  }
  ,
  "redeem(uint256,address,uint256)": {
    sighash: abi.getSighash("redeem(uint256,address,uint256)"),
    decode(input: string): Redeem0Function {
      return decodeFunction(input)
    }
  }
  ,
  "set(uint256,uint256[],bool)": {
    sighash: abi.getSighash("set(uint256,uint256[],bool)"),
    decode(input: string): Set0Function {
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
  "setClaimableBlock(uint256,uint256)": {
    sighash: abi.getSighash("setClaimableBlock(uint256,uint256)"),
    decode(input: string): SetClaimableBlock0Function {
      return decodeFunction(input)
    }
  }
  ,
  "stake(uint256,address,uint256)": {
    sighash: abi.getSighash("stake(uint256,address,uint256)"),
    decode(input: string): Stake0Function {
      return decodeFunction(input)
    }
  }
  ,
  "updatePool(uint256)": {
    sighash: abi.getSighash("updatePool(uint256)"),
    decode(input: string): UpdatePool0Function {
      return decodeFunction(input)
    }
  }
  ,
  "withdrawRewards(uint256,uint256[])": {
    sighash: abi.getSighash("withdrawRewards(uint256,uint256[])"),
    decode(input: string): WithdrawRewards0Function {
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

  async admin(): Promise<string> {
    return this.call("admin", [])
  }

  async adminCandidate(): Promise<string> {
    return this.call("adminCandidate", [])
  }

  async getPeriodsSinceStart(_pid: ethers.BigNumber): Promise<ethers.BigNumber> {
    return this.call("getPeriodsSinceStart", [_pid])
  }

  async getPoolInfo(_pid: ethers.BigNumber): Promise<([farmingToken: string, amount: ethers.BigNumber, rewardTokens: Array<string>, rewardPerBlock: Array<ethers.BigNumber>, accRewardPerShare: Array<ethers.BigNumber>, lastRewardBlock: ethers.BigNumber, startBlock: ethers.BigNumber, claimableInterval: ethers.BigNumber] & {farmingToken: string, amount: ethers.BigNumber, rewardTokens: Array<string>, rewardPerBlock: Array<ethers.BigNumber>, accRewardPerShare: Array<ethers.BigNumber>, lastRewardBlock: ethers.BigNumber, startBlock: ethers.BigNumber, claimableInterval: ethers.BigNumber})> {
    return this.call("getPoolInfo", [_pid])
  }

  async getRemaingRewards(_pid: ethers.BigNumber): Promise<Array<ethers.BigNumber>> {
    return this.call("getRemaingRewards", [_pid])
  }

  async getUserInfo(_pid: ethers.BigNumber, _user: string): Promise<([amount: ethers.BigNumber, pending: Array<ethers.BigNumber>, rewardDebt: Array<ethers.BigNumber>, nextClaimableBlock: ethers.BigNumber] & {amount: ethers.BigNumber, pending: Array<ethers.BigNumber>, rewardDebt: Array<ethers.BigNumber>, nextClaimableBlock: ethers.BigNumber})> {
    return this.call("getUserInfo", [_pid, _user])
  }

  async pendingRewards(_pid: ethers.BigNumber, _user: string): Promise<([rewards: Array<ethers.BigNumber>, nextClaimableBlock: ethers.BigNumber] & {rewards: Array<ethers.BigNumber>, nextClaimableBlock: ethers.BigNumber})> {
    return this.call("pendingRewards", [_pid, _user])
  }

  async poolLength(): Promise<ethers.BigNumber> {
    return this.call("poolLength", [])
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
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "rewards",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "Charged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "rewards",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "Claim",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "interval",
          "type": "uint256"
        }
      ],
      "name": "ClaimableBlockUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "farmingToken",
          "type": "address"
        }
      ],
      "name": "PoolAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Redeem",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Stake",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "pid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "rewards",
          "type": "address[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "WithdrawRewards",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_farmingToken",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_rewardTokens",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_rewardPerBlock",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "_startBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_claimableInterval",
          "type": "uint256"
        }
      ],
      "name": "add",
      "outputs": [],
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
      "inputs": [],
      "name": "candidateConfirm",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_amounts",
          "type": "uint256[]"
        }
      ],
      "name": "charge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "getPeriodsSinceStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "periods",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "getPoolInfo",
      "outputs": [
        {
          "internalType": "address",
          "name": "farmingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "rewardTokens",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "rewardPerBlock",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "accRewardPerShare",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "lastRewardBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "startBlock",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "claimableInterval",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "getRemaingRewards",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "remainingRewards",
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
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "pending",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "rewardDebt",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "nextClaimableBlock",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "pendingRewards",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "rewards",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "nextClaimableBlock",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "poolLength",
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
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_farmingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "redeem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_rewardPerBlock",
          "type": "uint256[]"
        },
        {
          "internalType": "bool",
          "name": "_withUpdate",
          "type": "bool"
        }
      ],
      "name": "set",
      "outputs": [],
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
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_interval",
          "type": "uint256"
        }
      ],
      "name": "setClaimableBlock",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_farmingToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        }
      ],
      "name": "updatePool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_amounts",
          "type": "uint256[]"
        }
      ],
      "name": "withdrawRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}
