import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './factory.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    AdminChanged: new LogEvent<([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})>(
        abi, '0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f'
    ),
    BootstrapSetted: new LogEvent<([tokenA: string, tokenB: string, bootstrap: string] & {tokenA: string, tokenB: string, bootstrap: string})>(
        abi, '0x8fbdc74091620b8104c8c6e08d389b29cefbb460df289e035349571f5a187814'
    ),
    Candidate: new LogEvent<([newAdmin: string] & {newAdmin: string})>(
        abi, '0x8cc40b9abca4a505a92028908f9d913d621d18112c69412806506f02333f26b4'
    ),
    FeeBasePointUpdated: new LogEvent<([basePoint: number] & {basePoint: number})>(
        abi, '0xcea85db5939aa6fa66ddd5c784e7284a46f4fba4e44f1e3d690f32d9acec167d'
    ),
    FeetoUpdated: new LogEvent<([feeto: string] & {feeto: string})>(
        abi, '0x4d7837711202d0d7574a0e818fc3ab5ad3bcb1bf388b35ce649fefcb1f46a47c'
    ),
    PairCreateLocked: new LogEvent<([caller: string] & {caller: string})>(
        abi, '0xc1524b448adbef1e113beb21fe1c291939668b9561ac836d3555e8c95963d4b0'
    ),
    PairCreateUnlocked: new LogEvent<([caller: string] & {caller: string})>(
        abi, '0xac45e0df4d004774ac0f710c9a0c240c354961a2f45e65cdd916c3974168c660'
    ),
    PairCreated: new LogEvent<([token0: string, token1: string, pair: string, param: bigint] & {token0: string, token1: string, pair: string, param: bigint})>(
        abi, '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9'
    ),
}

export const functions = {
    admin: new Func<[], {}, string>(
        abi, '0xf851a440'
    ),
    adminCandidate: new Func<[], {}, string>(
        abi, '0x3accfa6c'
    ),
    allPairs: new Func<[_: bigint], {}, string>(
        abi, '0x1e3dd18b'
    ),
    allPairsLength: new Func<[], {}, bigint>(
        abi, '0x574f2ba3'
    ),
    candidateConfirm: new Func<[], {}, []>(
        abi, '0x3f023230'
    ),
    createPair: new Func<[tokenA: string, tokenB: string], {tokenA: string, tokenB: string}, string>(
        abi, '0xc9c65396'
    ),
    feeBasePoint: new Func<[], {}, number>(
        abi, '0x1ef414f7'
    ),
    feeto: new Func<[], {}, string>(
        abi, '0xae3f1f2c'
    ),
    getBootstrap: new Func<[_: string, _: string], {}, string>(
        abi, '0x25095b18'
    ),
    getPair: new Func<[_: string, _: string], {}, string>(
        abi, '0xe6a43905'
    ),
    lockForPairCreate: new Func<[], {}, boolean>(
        abi, '0x405d31e0'
    ),
    lockPairCreate: new Func<[], {}, []>(
        abi, '0x798ad169'
    ),
    pairCodeHash: new Func<[], {}, string>(
        abi, '0x9aab9248'
    ),
    setAdminCandidate: new Func<[_candidate: string], {_candidate: string}, []>(
        abi, '0x96de7aa0'
    ),
    setBootstrap: new Func<[tokenA: string, tokenB: string, bootstrap: string], {tokenA: string, tokenB: string, bootstrap: string}, []>(
        abi, '0x4812d2cf'
    ),
    setFeeBasePoint: new Func<[_basePoint: number], {_basePoint: number}, []>(
        abi, '0x24f0b189'
    ),
    setFeeto: new Func<[_feeto: string], {_feeto: string}, []>(
        abi, '0xe3162274'
    ),
    unlockPairCreate: new Func<[], {}, []>(
        abi, '0x0406bd3f'
    ),
}

export class Contract extends ContractBase {

    admin(): Promise<string> {
        return this.eth_call(functions.admin, [])
    }

    adminCandidate(): Promise<string> {
        return this.eth_call(functions.adminCandidate, [])
    }

    allPairs(arg0: bigint): Promise<string> {
        return this.eth_call(functions.allPairs, [arg0])
    }

    allPairsLength(): Promise<bigint> {
        return this.eth_call(functions.allPairsLength, [])
    }

    feeBasePoint(): Promise<number> {
        return this.eth_call(functions.feeBasePoint, [])
    }

    feeto(): Promise<string> {
        return this.eth_call(functions.feeto, [])
    }

    getBootstrap(arg0: string, arg1: string): Promise<string> {
        return this.eth_call(functions.getBootstrap, [arg0, arg1])
    }

    getPair(arg0: string, arg1: string): Promise<string> {
        return this.eth_call(functions.getPair, [arg0, arg1])
    }

    lockForPairCreate(): Promise<boolean> {
        return this.eth_call(functions.lockForPairCreate, [])
    }

    pairCodeHash(): Promise<string> {
        return this.eth_call(functions.pairCodeHash, [])
    }
}
