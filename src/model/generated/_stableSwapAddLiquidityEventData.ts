import assert from "assert"
import * as marshal from "./marshal"

export class StableSwapAddLiquidityEventData {
    public readonly isTypeOf = 'StableSwapAddLiquidityEventData'
    private _provider!: Uint8Array
    private _tokenAmounts!: (string)[]
    private _fees!: (string)[]
    private _invariant!: bigint | undefined | null
    private _lpTokenSupply!: bigint

    constructor(props?: Partial<Omit<StableSwapAddLiquidityEventData, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._provider = marshal.bytes.fromJSON(json.provider)
            this._tokenAmounts = marshal.fromList(json.tokenAmounts, val => marshal.string.fromJSON(val))
            this._fees = marshal.fromList(json.fees, val => marshal.string.fromJSON(val))
            this._invariant = json.invariant == null ? undefined : marshal.bigint.fromJSON(json.invariant)
            this._lpTokenSupply = marshal.bigint.fromJSON(json.lpTokenSupply)
        }
    }

    get provider(): Uint8Array {
        assert(this._provider != null, 'uninitialized access')
        return this._provider
    }

    set provider(value: Uint8Array) {
        this._provider = value
    }

    get tokenAmounts(): (string)[] {
        assert(this._tokenAmounts != null, 'uninitialized access')
        return this._tokenAmounts
    }

    set tokenAmounts(value: (string)[]) {
        this._tokenAmounts = value
    }

    get fees(): (string)[] {
        assert(this._fees != null, 'uninitialized access')
        return this._fees
    }

    set fees(value: (string)[]) {
        this._fees = value
    }

    get invariant(): bigint | undefined | null {
        return this._invariant
    }

    set invariant(value: bigint | undefined | null) {
        this._invariant = value
    }

    get lpTokenSupply(): bigint {
        assert(this._lpTokenSupply != null, 'uninitialized access')
        return this._lpTokenSupply
    }

    set lpTokenSupply(value: bigint) {
        this._lpTokenSupply = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            provider: marshal.bytes.toJSON(this.provider),
            tokenAmounts: this.tokenAmounts,
            fees: this.fees,
            invariant: this.invariant == null ? undefined : marshal.bigint.toJSON(this.invariant),
            lpTokenSupply: marshal.bigint.toJSON(this.lpTokenSupply),
        }
    }
}
