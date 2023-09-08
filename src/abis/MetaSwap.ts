import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './MetaSwap.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    AddLiquidity: new LogEvent<([provider: string, tokenAmounts: Array<bigint>, fees: Array<bigint>, invariant: bigint, tokenSupply: bigint] & {provider: string, tokenAmounts: Array<bigint>, fees: Array<bigint>, invariant: bigint, tokenSupply: bigint})>(
        abi, '0x189c623b666b1b45b83d7178f39b8c087cb09774317ca2f53c2d3c3726f222a2'
    ),
    AdminChanged: new LogEvent<([oldAdmin: string, newAdmin: string] & {oldAdmin: string, newAdmin: string})>(
        abi, '0x7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f'
    ),
    Candidate: new LogEvent<([newAdmin: string] & {newAdmin: string})>(
        abi, '0x8cc40b9abca4a505a92028908f9d913d621d18112c69412806506f02333f26b4'
    ),
    CollectProtocolFee: new LogEvent<([token: string, amount: bigint] & {token: string, amount: bigint})>(
        abi, '0xee3859efa95e525bc2bcb149b51b60a8bb4e89c647392d9d4112e03c3e73bdd6'
    ),
    FeeControllerChanged: new LogEvent<([newController: string] & {newController: string})>(
        abi, '0x4c3f3b9852ccceadd50f16518f348e2624c8f0240acdd5bc81911c0fba83ec67'
    ),
    FeeDistributorChanged: new LogEvent<([newController: string] & {newController: string})>(
        abi, '0xae5a12c29e496b092467a620746b9eaf4e0e231a631a4370c233b1fac38e8e26'
    ),
    FlashLoan: new LogEvent<([caller: string, receiver: string, amounts_out: Array<bigint>] & {caller: string, receiver: string, amounts_out: Array<bigint>})>(
        abi, '0x1e659566d9cc1f93351027d53422a1ec429f52c34bc45ee462dd91e99bdd26bb'
    ),
    Initialized: new LogEvent<([version: number] & {version: number})>(
        abi, '0x7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498'
    ),
    NewFee: new LogEvent<([fee: bigint, adminFee: bigint] & {fee: bigint, adminFee: bigint})>(
        abi, '0xbe12859b636aed607d5230b2cc2711f68d70e51060e6cca1f575ef5d2fcc95d1'
    ),
    Paused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'
    ),
    RampA: new LogEvent<([oldA: bigint, newA: bigint, initialTime: bigint, futureTime: bigint] & {oldA: bigint, newA: bigint, initialTime: bigint, futureTime: bigint})>(
        abi, '0xa2b71ec6df949300b59aab36b55e189697b750119dd349fcfa8c0f779e83c254'
    ),
    RemoveLiquidity: new LogEvent<([provider: string, tokenAmounts: Array<bigint>, fees: Array<bigint>, tokenSupply: bigint] & {provider: string, tokenAmounts: Array<bigint>, fees: Array<bigint>, tokenSupply: bigint})>(
        abi, '0x347ad828e58cbe534d8f6b67985d791360756b18f0d95fd9f197a66cc46480ea'
    ),
    RemoveLiquidityImbalance: new LogEvent<([provider: string, tokenAmounts: Array<bigint>, fees: Array<bigint>, invariant: bigint, tokenSupply: bigint] & {provider: string, tokenAmounts: Array<bigint>, fees: Array<bigint>, invariant: bigint, tokenSupply: bigint})>(
        abi, '0x3631c28b1f9dd213e0319fb167b554d76b6c283a41143eb400a0d1adb1af1755'
    ),
    RemoveLiquidityOne: new LogEvent<([provider: string, tokenIndex: bigint, tokenAmount: bigint, coinAmount: bigint] & {provider: string, tokenIndex: bigint, tokenAmount: bigint, coinAmount: bigint})>(
        abi, '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0'
    ),
    StopRampA: new LogEvent<([A: bigint, timestamp: bigint] & {A: bigint, timestamp: bigint})>(
        abi, '0x46e22fb3709ad289f62ce63d469248536dbc78d82b84a3d7e74ad606dc201938'
    ),
    TokenExchange: new LogEvent<([buyer: string, soldId: bigint, tokensSold: bigint, boughtId: bigint, tokensBought: bigint] & {buyer: string, soldId: bigint, tokensSold: bigint, boughtId: bigint, tokensBought: bigint})>(
        abi, '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98'
    ),
    TokenSwapUnderlying: new LogEvent<([buyer: string, tokensSold: bigint, tokensBought: bigint, soldId: bigint, boughtId: bigint] & {buyer: string, tokensSold: bigint, tokensBought: bigint, soldId: bigint, boughtId: bigint})>(
        abi, '0x6617207207e397b41fc98016d8c9febb7223f44c355db66ad429730f2b950a60'
    ),
    Unpaused: new LogEvent<([account: string] & {account: string})>(
        abi, '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'
    ),
}

export const functions = {
    MAX_A: new Func<[], {}, bigint>(
        abi, '0x39698415'
    ),
    MAX_ADMIN_FEE: new Func<[], {}, bigint>(
        abi, '0xf3de0362'
    ),
    MAX_A_CHANGE: new Func<[], {}, bigint>(
        abi, '0xab5ac061'
    ),
    MAX_SWAP_FEE: new Func<[], {}, bigint>(
        abi, '0xab3d8544'
    ),
    MIN_RAMP_TIME: new Func<[], {}, bigint>(
        abi, '0x06e9481c'
    ),
    addLiquidity: new Func<[amounts: Array<bigint>, minMintAmount: bigint, deadline: bigint], {amounts: Array<bigint>, minMintAmount: bigint, deadline: bigint}, bigint>(
        abi, '0x4d49e87d'
    ),
    admin: new Func<[], {}, string>(
        abi, '0xf851a440'
    ),
    adminCandidate: new Func<[], {}, string>(
        abi, '0x3accfa6c'
    ),
    calculateRemoveLiquidity: new Func<[amount: bigint], {amount: bigint}, Array<bigint>>(
        abi, '0xf2fad2b6'
    ),
    calculateRemoveLiquidityOneToken: new Func<[tokenAmount: bigint, tokenIndex: number], {tokenAmount: bigint, tokenIndex: number}, bigint>(
        abi, '0x342a87a1'
    ),
    calculateSwap: new Func<[tokenIndexFrom: number, tokenIndexTo: number, dx: bigint], {tokenIndexFrom: number, tokenIndexTo: number, dx: bigint}, bigint>(
        abi, '0xa95b089f'
    ),
    calculateSwapUnderlying: new Func<[tokenIndexFrom: number, tokenIndexTo: number, dx: bigint], {tokenIndexFrom: number, tokenIndexTo: number, dx: bigint}, bigint>(
        abi, '0x75d8e3e4'
    ),
    calculateTokenAmount: new Func<[amounts: Array<bigint>, deposit: boolean], {amounts: Array<bigint>, deposit: boolean}, bigint>(
        abi, '0xe6ab2806'
    ),
    candidateConfirm: new Func<[], {}, []>(
        abi, '0x3f023230'
    ),
    feeController: new Func<[], {}, string>(
        abi, '0x6999b377'
    ),
    feeDistributor: new Func<[], {}, string>(
        abi, '0x0d43e8ad'
    ),
    flashLoan: new Func<[amountsOut: Array<bigint>, to: string, data: string, deadline: bigint], {amountsOut: Array<bigint>, to: string, data: string, deadline: bigint}, []>(
        abi, '0x0e0807f6'
    ),
    getA: new Func<[], {}, bigint>(
        abi, '0xd46300fd'
    ),
    getAPrecise: new Func<[], {}, bigint>(
        abi, '0x0ba81959'
    ),
    getAdminBalance: new Func<[index: number], {index: number}, bigint>(
        abi, '0x8554a7d4'
    ),
    getAdminBalances: new Func<[], {}, Array<bigint>>(
        abi, '0x18f52ce2'
    ),
    getLpToken: new Func<[], {}, string>(
        abi, '0x8214f5a4'
    ),
    getNumberOfTokens: new Func<[], {}, bigint>(
        abi, '0xefeecb51'
    ),
    getToken: new Func<[index: number], {index: number}, string>(
        abi, '0x82b86600'
    ),
    getTokenBalance: new Func<[index: number], {index: number}, bigint>(
        abi, '0x91ceb3eb'
    ),
    getTokenBalances: new Func<[], {}, Array<bigint>>(
        abi, '0xa1dc9031'
    ),
    getTokenIndex: new Func<[token: string], {token: string}, number>(
        abi, '0x66c0bd24'
    ),
    getTokenPrecisionMultipliers: new Func<[], {}, Array<bigint>>(
        abi, '0xd41f6568'
    ),
    getTokens: new Func<[], {}, Array<string>>(
        abi, '0xaa6ca808'
    ),
    getVirtualPrice: new Func<[], {}, bigint>(
        abi, '0xe25aa5fa'
    ),
    initialize: new Func<[_: Array<string>, _: Array<number>, _: string, _: string, _: bigint, _: bigint, _: bigint, _: string], {}, []>(
        abi, '0xb28cb6dc'
    ),
    initializeMetaSwap: new Func<[_pooledTokens: Array<string>, decimals: Array<number>, lpTokenName: string, lpTokenSymbol: string, _a: bigint, _fee: bigint, _adminFee: bigint, _feeDistributor: string, baseSwap: string], {_pooledTokens: Array<string>, decimals: Array<number>, lpTokenName: string, lpTokenSymbol: string, _a: bigint, _fee: bigint, _adminFee: bigint, _feeDistributor: string, baseSwap: string}, []>(
        abi, '0x118e1c77'
    ),
    metaSwapStorage: new Func<[], {}, ([baseSwap: string, baseVirtualPrice: bigint, baseCacheLastUpdated: bigint] & {baseSwap: string, baseVirtualPrice: bigint, baseCacheLastUpdated: bigint})>(
        abi, '0x2d74d4e9'
    ),
    pause: new Func<[], {}, []>(
        abi, '0x8456cb59'
    ),
    paused: new Func<[], {}, boolean>(
        abi, '0x5c975abb'
    ),
    rampA: new Func<[futureA: bigint, futureATime: bigint], {futureA: bigint, futureATime: bigint}, []>(
        abi, '0x593d132c'
    ),
    removeLiquidity: new Func<[lpAmount: bigint, minAmounts: Array<bigint>, deadline: bigint], {lpAmount: bigint, minAmounts: Array<bigint>, deadline: bigint}, Array<bigint>>(
        abi, '0x31cd52b0'
    ),
    removeLiquidityImbalance: new Func<[amounts: Array<bigint>, maxBurnAmount: bigint, deadline: bigint], {amounts: Array<bigint>, maxBurnAmount: bigint, deadline: bigint}, bigint>(
        abi, '0x84cdd9bc'
    ),
    removeLiquidityOneToken: new Func<[lpAmount: bigint, index: number, minAmount: bigint, deadline: bigint], {lpAmount: bigint, index: number, minAmount: bigint, deadline: bigint}, bigint>(
        abi, '0x3e3a1560'
    ),
    setAdminCandidate: new Func<[_candidate: string], {_candidate: string}, []>(
        abi, '0x96de7aa0'
    ),
    setFee: new Func<[newSwapFee: bigint, newAdminFee: bigint], {newSwapFee: bigint, newAdminFee: bigint}, []>(
        abi, '0x52f7c988'
    ),
    setFeeController: new Func<[_feeController: string], {_feeController: string}, []>(
        abi, '0x3ed4c678'
    ),
    setFeeDistributor: new Func<[_feeDistributor: string], {_feeDistributor: string}, []>(
        abi, '0xccfc2e8d'
    ),
    stopRampA: new Func<[], {}, []>(
        abi, '0xc4db7fa0'
    ),
    swap: new Func<[tokenIndexFrom: number, tokenIndexTo: number, dx: bigint, minDy: bigint, deadline: bigint], {tokenIndexFrom: number, tokenIndexTo: number, dx: bigint, minDy: bigint, deadline: bigint}, bigint>(
        abi, '0x91695586'
    ),
    swapStorage: new Func<[], {}, ([lpToken: string, fee: bigint, adminFee: bigint, initialA: bigint, futureA: bigint, initialATime: bigint, futureATime: bigint] & {lpToken: string, fee: bigint, adminFee: bigint, initialA: bigint, futureA: bigint, initialATime: bigint, futureATime: bigint})>(
        abi, '0x5fd65f0f'
    ),
    swapUnderlying: new Func<[tokenIndexFrom: number, tokenIndexTo: number, dx: bigint, minDy: bigint, deadline: bigint], {tokenIndexFrom: number, tokenIndexTo: number, dx: bigint, minDy: bigint, deadline: bigint}, bigint>(
        abi, '0x78e0fae8'
    ),
    tokenIndexes: new Func<[_: string], {}, number>(
        abi, '0x04bc3b1c'
    ),
    unpause: new Func<[], {}, []>(
        abi, '0x3f4ba83a'
    ),
    withdrawAdminFee: new Func<[], {}, []>(
        abi, '0xfe49abe3'
    ),
}

export class Contract extends ContractBase {

    MAX_A(): Promise<bigint> {
        return this.eth_call(functions.MAX_A, [])
    }

    MAX_ADMIN_FEE(): Promise<bigint> {
        return this.eth_call(functions.MAX_ADMIN_FEE, [])
    }

    MAX_A_CHANGE(): Promise<bigint> {
        return this.eth_call(functions.MAX_A_CHANGE, [])
    }

    MAX_SWAP_FEE(): Promise<bigint> {
        return this.eth_call(functions.MAX_SWAP_FEE, [])
    }

    MIN_RAMP_TIME(): Promise<bigint> {
        return this.eth_call(functions.MIN_RAMP_TIME, [])
    }

    admin(): Promise<string> {
        return this.eth_call(functions.admin, [])
    }

    adminCandidate(): Promise<string> {
        return this.eth_call(functions.adminCandidate, [])
    }

    calculateRemoveLiquidity(amount: bigint): Promise<Array<bigint>> {
        return this.eth_call(functions.calculateRemoveLiquidity, [amount])
    }

    calculateRemoveLiquidityOneToken(tokenAmount: bigint, tokenIndex: number): Promise<bigint> {
        return this.eth_call(functions.calculateRemoveLiquidityOneToken, [tokenAmount, tokenIndex])
    }

    calculateSwap(tokenIndexFrom: number, tokenIndexTo: number, dx: bigint): Promise<bigint> {
        return this.eth_call(functions.calculateSwap, [tokenIndexFrom, tokenIndexTo, dx])
    }

    calculateSwapUnderlying(tokenIndexFrom: number, tokenIndexTo: number, dx: bigint): Promise<bigint> {
        return this.eth_call(functions.calculateSwapUnderlying, [tokenIndexFrom, tokenIndexTo, dx])
    }

    calculateTokenAmount(amounts: Array<bigint>, deposit: boolean): Promise<bigint> {
        return this.eth_call(functions.calculateTokenAmount, [amounts, deposit])
    }

    feeController(): Promise<string> {
        return this.eth_call(functions.feeController, [])
    }

    feeDistributor(): Promise<string> {
        return this.eth_call(functions.feeDistributor, [])
    }

    getA(): Promise<bigint> {
        return this.eth_call(functions.getA, [])
    }

    getAPrecise(): Promise<bigint> {
        return this.eth_call(functions.getAPrecise, [])
    }

    getAdminBalance(index: number): Promise<bigint> {
        return this.eth_call(functions.getAdminBalance, [index])
    }

    getAdminBalances(): Promise<Array<bigint>> {
        return this.eth_call(functions.getAdminBalances, [])
    }

    getLpToken(): Promise<string> {
        return this.eth_call(functions.getLpToken, [])
    }

    getNumberOfTokens(): Promise<bigint> {
        return this.eth_call(functions.getNumberOfTokens, [])
    }

    getToken(index: number): Promise<string> {
        return this.eth_call(functions.getToken, [index])
    }

    getTokenBalance(index: number): Promise<bigint> {
        return this.eth_call(functions.getTokenBalance, [index])
    }

    getTokenBalances(): Promise<Array<bigint>> {
        return this.eth_call(functions.getTokenBalances, [])
    }

    getTokenIndex(token: string): Promise<number> {
        return this.eth_call(functions.getTokenIndex, [token])
    }

    getTokenPrecisionMultipliers(): Promise<Array<bigint>> {
        return this.eth_call(functions.getTokenPrecisionMultipliers, [])
    }

    getTokens(): Promise<Array<string>> {
        return this.eth_call(functions.getTokens, [])
    }

    getVirtualPrice(): Promise<bigint> {
        return this.eth_call(functions.getVirtualPrice, [])
    }

    metaSwapStorage(): Promise<([baseSwap: string, baseVirtualPrice: bigint, baseCacheLastUpdated: bigint] & {baseSwap: string, baseVirtualPrice: bigint, baseCacheLastUpdated: bigint})> {
        return this.eth_call(functions.metaSwapStorage, [])
    }

    paused(): Promise<boolean> {
        return this.eth_call(functions.paused, [])
    }

    swapStorage(): Promise<([lpToken: string, fee: bigint, adminFee: bigint, initialA: bigint, futureA: bigint, initialATime: bigint, futureATime: bigint] & {lpToken: string, fee: bigint, adminFee: bigint, initialA: bigint, futureA: bigint, initialATime: bigint, futureATime: bigint})> {
        return this.eth_call(functions.swapStorage, [])
    }

    tokenIndexes(arg0: string): Promise<number> {
        return this.eth_call(functions.tokenIndexes, [arg0])
    }
}
