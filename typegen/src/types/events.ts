import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v49 from './v49'
import * as v1801 from './v1801'

export class EvmLogEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'EVM.Log')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Ethereum events from contracts.
   */
  get isV49(): boolean {
    return this._chain.getEventHash('EVM.Log') === '9d15dce6e6d818eeb73a868dd136a22667fbfdd27463a338b39cabae62aa4a12'
  }

  /**
   *  Ethereum events from contracts.
   */
  get asV49(): v49.EvmLog {
    assert(this.isV49)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Ethereum events from contracts.
   */
  get isV1801(): boolean {
    return this._chain.getEventHash('EVM.Log') === '4edddb5632dcffc943bfbdb42201f95b9c2ffa1df042e526a7c54a39f099056a'
  }

  /**
   * Ethereum events from contracts.
   */
  get asV1801(): {log: v1801.Log} {
    assert(this.isV1801)
    return this._chain.decodeEvent(this.event)
  }
}
