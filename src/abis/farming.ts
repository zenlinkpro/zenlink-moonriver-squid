import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './farming.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    AdminChanged: new LogEvent<([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})>(
        abi, '0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f'
    ),
    Candidate: new LogEvent<([newAdmin: string] & {newAdmin: string})>(
        abi, '0x8cc40b9abca4a505a92028908f9d913d621d18112c69412806506f02333f26b4'
    ),
    Charged: new LogEvent<([pid: bigint, rewards: Array<string>, amounts: Array<bigint>] & {pid: bigint, rewards: Array<string>, amounts: Array<bigint>})>(
        abi, '0xa145d60156a87e91a4a98486a8d187f4e4b78f756ff02d42b63b4b2f97207d4d'
    ),
    Claim: new LogEvent<([user: string, pid: bigint, rewards: Array<string>, amounts: Array<bigint>] & {user: string, pid: bigint, rewards: Array<string>, amounts: Array<bigint>})>(
        abi, '0x29efd1570858633f7fcf640ecc43b3edc6515af5b29e8e92d9dcad5209f5cd0d'
    ),
    ClaimableBlockUpdated: new LogEvent<([pid: bigint, interval: bigint] & {pid: bigint, interval: bigint})>(
        abi, '0xa885ff4d8d3bf78eea3ffc74848dbebe77635486e06727000a3c1b5837845e0a'
    ),
    EmergencyWithdraw: new LogEvent<([user: string, pid: bigint, amount: bigint] & {user: string, pid: bigint, amount: bigint})>(
        abi, '0xbb757047c2b5f3974fe26b7c10f732e7bce710b0952a71082702781e62ae0595'
    ),
    PoolAdded: new LogEvent<([farmingToken: string] & {farmingToken: string})>(
        abi, '0x73cca62ab1b520c9715bf4e6c71e3e518c754e7148f65102f43289a7df0efea6'
    ),
    Redeem: new LogEvent<([user: string, pid: bigint, amount: bigint] & {user: string, pid: bigint, amount: bigint})>(
        abi, '0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929'
    ),
    Stake: new LogEvent<([user: string, pid: bigint, amount: bigint] & {user: string, pid: bigint, amount: bigint})>(
        abi, '0x5af417134f72a9d41143ace85b0a26dce6f550f894f2cbc1eeee8810603d91b6'
    ),
    WithdrawRewards: new LogEvent<([pid: bigint, rewards: Array<string>, amounts: Array<bigint>] & {pid: bigint, rewards: Array<string>, amounts: Array<bigint>})>(
        abi, '0x8a63d6747886a8cc1166e78fdd0df86a7a77fe1ee60ac1d042e6ff56c234fcc5'
    ),
}

export const functions = {
    add: new Func<[_farmingToken: string, _rewardTokens: Array<string>, _rewardPerBlock: Array<bigint>, _startBlock: bigint, _claimableInterval: bigint], {_farmingToken: string, _rewardTokens: Array<string>, _rewardPerBlock: Array<bigint>, _startBlock: bigint, _claimableInterval: bigint}, []>(
        abi, '0x13df2cb5'
    ),
    admin: new Func<[], {}, string>(
        abi, '0xf851a440'
    ),
    adminCandidate: new Func<[], {}, string>(
        abi, '0x3accfa6c'
    ),
    candidateConfirm: new Func<[], {}, []>(
        abi, '0x3f023230'
    ),
    charge: new Func<[_pid: bigint, _amounts: Array<bigint>], {_pid: bigint, _amounts: Array<bigint>}, []>(
        abi, '0x432daf3d'
    ),
    claim: new Func<[_pid: bigint], {_pid: bigint}, []>(
        abi, '0x379607f5'
    ),
    emergencyWithdraw: new Func<[_pid: bigint], {_pid: bigint}, []>(
        abi, '0x5312ea8e'
    ),
    getPeriodsSinceStart: new Func<[_pid: bigint], {_pid: bigint}, bigint>(
        abi, '0xf674fc50'
    ),
    getPoolInfo: new Func<[_pid: bigint], {_pid: bigint}, ([farmingToken: string, amount: bigint, rewardTokens: Array<string>, rewardPerBlock: Array<bigint>, accRewardPerShare: Array<bigint>, lastRewardBlock: bigint, startBlock: bigint, claimableInterval: bigint] & {farmingToken: string, amount: bigint, rewardTokens: Array<string>, rewardPerBlock: Array<bigint>, accRewardPerShare: Array<bigint>, lastRewardBlock: bigint, startBlock: bigint, claimableInterval: bigint})>(
        abi, '0x2f380b35'
    ),
    getRemaingRewards: new Func<[_pid: bigint], {_pid: bigint}, Array<bigint>>(
        abi, '0x74ffcc1a'
    ),
    getUserInfo: new Func<[_pid: bigint, _user: string], {_pid: bigint, _user: string}, ([amount: bigint, pending: Array<bigint>, rewardDebt: Array<bigint>, nextClaimableBlock: bigint] & {amount: bigint, pending: Array<bigint>, rewardDebt: Array<bigint>, nextClaimableBlock: bigint})>(
        abi, '0x1069f3b5'
    ),
    pendingRewards: new Func<[_pid: bigint, _user: string], {_pid: bigint, _user: string}, ([rewards: Array<bigint>, nextClaimableBlock: bigint] & {rewards: Array<bigint>, nextClaimableBlock: bigint})>(
        abi, '0xd18df53c'
    ),
    poolLength: new Func<[], {}, bigint>(
        abi, '0x081e3eda'
    ),
    redeem: new Func<[_pid: bigint, _farmingToken: string, _amount: bigint], {_pid: bigint, _farmingToken: string, _amount: bigint}, []>(
        abi, '0xd8780161'
    ),
    set: new Func<[_pid: bigint, _rewardPerBlock: Array<bigint>, _withUpdate: boolean], {_pid: bigint, _rewardPerBlock: Array<bigint>, _withUpdate: boolean}, []>(
        abi, '0x4dd1a1b7'
    ),
    setAdminCandidate: new Func<[_candidate: string], {_candidate: string}, []>(
        abi, '0x96de7aa0'
    ),
    setClaimableBlock: new Func<[_pid: bigint, _interval: bigint], {_pid: bigint, _interval: bigint}, []>(
        abi, '0x95e77e53'
    ),
    stake: new Func<[_pid: bigint, _farmingToken: string, _amount: bigint], {_pid: bigint, _farmingToken: string, _amount: bigint}, []>(
        abi, '0x6e9c931c'
    ),
    updatePool: new Func<[_pid: bigint], {_pid: bigint}, []>(
        abi, '0x51eb05a6'
    ),
    withdrawRewards: new Func<[_pid: bigint, _amounts: Array<bigint>], {_pid: bigint, _amounts: Array<bigint>}, []>(
        abi, '0xa0b1f5dd'
    ),
}

export class Contract extends ContractBase {

    admin(): Promise<string> {
        return this.eth_call(functions.admin, [])
    }

    adminCandidate(): Promise<string> {
        return this.eth_call(functions.adminCandidate, [])
    }

    getPeriodsSinceStart(_pid: bigint): Promise<bigint> {
        return this.eth_call(functions.getPeriodsSinceStart, [_pid])
    }

    getPoolInfo(_pid: bigint): Promise<([farmingToken: string, amount: bigint, rewardTokens: Array<string>, rewardPerBlock: Array<bigint>, accRewardPerShare: Array<bigint>, lastRewardBlock: bigint, startBlock: bigint, claimableInterval: bigint] & {farmingToken: string, amount: bigint, rewardTokens: Array<string>, rewardPerBlock: Array<bigint>, accRewardPerShare: Array<bigint>, lastRewardBlock: bigint, startBlock: bigint, claimableInterval: bigint})> {
        return this.eth_call(functions.getPoolInfo, [_pid])
    }

    getRemaingRewards(_pid: bigint): Promise<Array<bigint>> {
        return this.eth_call(functions.getRemaingRewards, [_pid])
    }

    getUserInfo(_pid: bigint, _user: string): Promise<([amount: bigint, pending: Array<bigint>, rewardDebt: Array<bigint>, nextClaimableBlock: bigint] & {amount: bigint, pending: Array<bigint>, rewardDebt: Array<bigint>, nextClaimableBlock: bigint})> {
        return this.eth_call(functions.getUserInfo, [_pid, _user])
    }

    pendingRewards(_pid: bigint, _user: string): Promise<([rewards: Array<bigint>, nextClaimableBlock: bigint] & {rewards: Array<bigint>, nextClaimableBlock: bigint})> {
        return this.eth_call(functions.pendingRewards, [_pid, _user])
    }

    poolLength(): Promise<bigint> {
        return this.eth_call(functions.poolLength, [])
    }
}
