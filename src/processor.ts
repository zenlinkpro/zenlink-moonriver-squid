import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { 
  BlockHeader, 
  DataHandlerContext, 
  EvmBatchProcessor, 
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { CHAIN_NODE, FACTORY_ADDRESS, FOUR_POOL, FOUR_POOL_LP, FARMING_ADDRESS } from "./consts";
import * as factory from './abis/factory'
import * as pair from './abis/pair'
import * as erc20 from './abis/ERC20'
import * as farming from './abis/farming'
import { handleNewPair } from "./mappings/factory";
import { Pair } from "./model";
import { handleBurn, handleMint, handleSwap, handleSync, handleTransfer } from "./mappings/pair";
import * as StableSwapContract from "./abis/StableSwap"
import {
  handleRampA,
  handleStableSwapAddLiquidity,
  handleStableSwapExchange,
  handleStableSwapNewFee,
  handleStableSwapRemoveLiquidity,
  handleStableSwapRemoveLiquidityImbalance,
  handleStableSwapRemoveLiquidityOne,
  handleStableSwapTransfer,
  handleStopRampA
} from "./mappings/stableSwap";
import { handleFarmingClaim, handleFarmingPoolAdd, handleFarmingRedeem, handleFarmingStake } from "./mappings/farming";

const database = new TypeormDatabase()
const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: 'https://v2.archive.subsquid.io/network/moonriver-mainnet',
    chain: CHAIN_NODE
  })
  .setFinalityConfirmation(10)
  .setBlockRange({ from: 1837375 })
  .addLog({
    address: [FACTORY_ADDRESS],
    topic0: [factory.events.PairCreated.topic],
  })
  .addLog({
    topic0: [
        pair.events.Transfer.topic,
        pair.events.Sync.topic,
        pair.events.Swap.topic,
        pair.events.Mint.topic,
        pair.events.Burn.topic,
    ],
    transaction: true
  })
  .addLog({
    address: [FOUR_POOL],
    topic0: [
        StableSwapContract.events.NewFee.topic,
        StableSwapContract.events.RampA.topic,
        StableSwapContract.events.StopRampA.topic,
        StableSwapContract.events.AddLiquidity.topic,
        StableSwapContract.events.RemoveLiquidity.topic,
        StableSwapContract.events.RemoveLiquidityOne.topic,
        StableSwapContract.events.RemoveLiquidityImbalance.topic,
        StableSwapContract.events.TokenExchange.topic
    ],
    transaction: true,
    range: { from: 1837375 }
  })
  .addLog({
    address: [FOUR_POOL_LP],
    topic0: [
        erc20.events.Transfer.topic,
    ],
    transaction: true,
    range: { from: 1837375 }
  })
  .addLog({
    address: [FARMING_ADDRESS],
    topic0: [
        farming.events.Stake.topic,
        farming.events.Redeem.topic,
        farming.events.Claim.topic,
        farming.events.WithdrawRewards.topic,
        farming.events.EmergencyWithdraw.topic,
        farming.events.PoolAdded.topic,
    ],
    transaction: true,
    range: { from: 1837375 }
  })

processor.run(database, async (ctx) => {
  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      await handleEvmLog(ctx, log)
    }
  }
})

const knownPairContracts: Set<string> = new Set()

async function tryIsPairInvolved(store: Store, address: string) {
  try {
    return (await store.countBy(Pair, { id: address })) > 0
  } catch {
    return false
  }
}

async function isKnownPairContracts(store: Store, address: string) {
  const normalizedAddress = address.toLowerCase()
  if (knownPairContracts.has(normalizedAddress)) {
    return true
  }
  if (await tryIsPairInvolved(store, normalizedAddress)) {
    knownPairContracts.add(normalizedAddress)
    return true
  }
  return false
}

async function handleEvmLog(ctx: Context, log: Log) {
  const contractAddress = log.address
  switch (contractAddress) {
    case FACTORY_ADDRESS:
      await handleNewPair(ctx, log)
      break
    case FOUR_POOL:
      switch (log.topics[0]) {
        case StableSwapContract.events.NewFee.topic:
          await handleStableSwapNewFee(ctx, log)
          break
        case StableSwapContract.events.RampA.topic:
          await handleRampA(ctx, log)
          break
        case StableSwapContract.events.StopRampA.topic:
          await handleStopRampA(ctx, log)
          break
        case StableSwapContract.events.AddLiquidity.topic:
          await handleStableSwapAddLiquidity(ctx, log)
          break
        case StableSwapContract.events.RemoveLiquidity.topic:
          await handleStableSwapRemoveLiquidity(ctx, log)
          break
        case StableSwapContract.events.RemoveLiquidityOne.topic:
          await handleStableSwapRemoveLiquidityOne(ctx, log)
          break
        case StableSwapContract.events.RemoveLiquidityImbalance.topic:
          await handleStableSwapRemoveLiquidityImbalance(ctx, log)
          break
        case StableSwapContract.events.TokenExchange.topic:
          await handleStableSwapExchange(ctx, log)
          break
        default:
          break
      }
      break
    case FOUR_POOL_LP:
      switch (log.topics[0]) {
        case erc20.events.Transfer.topic:
          await handleStableSwapTransfer(ctx, log)
          break
        default:
          break
      }
      break
    case FARMING_ADDRESS:
      switch (log.topics[0]) {
        case farming.events.PoolAdded.topic:
          await handleFarmingPoolAdd(ctx, log)
          break
        case farming.events.Stake.topic:
          await handleFarmingStake(ctx, log)
          break
        case farming.events.Claim.topic:
          await handleFarmingClaim(ctx, log)
          break
        case farming.events.Redeem.topic:
          await handleFarmingRedeem(ctx, log)
          break
        default:
          break
      }
      break
    default:
      if (await isKnownPairContracts(ctx.store, contractAddress)) {
        switch (log.topics[0]) {
          case pair.events.Transfer.topic:
            await handleTransfer(ctx, log)
            break
          case pair.events.Sync.topic:
            await handleSync(ctx, log)
            break
          case pair.events.Swap.topic:
            await handleSwap(ctx, log)
            break
          case pair.events.Mint.topic:
            await handleMint(ctx, log)
            break
          case pair.events.Burn.topic:
            await handleBurn(ctx, log)
            break
          default:
            break
        }
      }
  }
}

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
