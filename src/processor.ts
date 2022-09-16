import { lookupArchive } from "@subsquid/archive-registry";
import { EvmLogHandlerContext, SubstrateBatchProcessor } from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { CHAIN_NODE, FACTORY_ADDRESS, FOUR_POOL } from "./consts";
import * as factory from './abis/factory'
import * as pair from './abis/pair'
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
  handleStopRampA 
} from "./mappings/stableSwap";

const database = new TypeormDatabase()
const processor = new SubstrateBatchProcessor()
  .setBatchSize(100)
  .setBlockRange({ from: 2341124 })
  .setDataSource({
    chain: CHAIN_NODE,
    archive: lookupArchive('moonriver', { release: "FireSquid" })
  })
  .addEvmLog(FACTORY_ADDRESS, {
    filter: [factory.events['PairCreated(address,address,address,uint256)'].topic],
  })
  .addEvmLog('*', {
    filter: [
      [
        pair.events['Transfer(address,address,uint256)'].topic,
        pair.events['Sync(uint112,uint112)'].topic,
        pair.events['Swap(address,uint256,uint256,uint256,uint256,address)'].topic,
        pair.events['Mint(address,uint256,uint256)'].topic,
        pair.events['Burn(address,uint256,uint256,address)'].topic,
      ],
    ],
  })
  .addEvmLog(FOUR_POOL, {
    filter: [
      [
        StableSwapContract.events['NewFee(uint256,uint256)'].topic,
        StableSwapContract.events['RampA(uint256,uint256,uint256,uint256)'].topic,
        StableSwapContract.events['StopRampA(uint256,uint256)'].topic,
        StableSwapContract.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic,
        StableSwapContract.events['RemoveLiquidity(address,uint256[],uint256[],uint256)'].topic,
        StableSwapContract.events['RemoveLiquidityOne(address,uint256,uint256,uint256)'].topic,
        StableSwapContract.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic,
        StableSwapContract.events['TokenExchange(address,uint256,uint256,uint256,uint256)'].topic
      ],
    ],
    range: { from: 2341125 }
  })

processor.run(database, async (ctx) => {
  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.kind === 'event') {
        if (item.name === 'EVM.Log') {
          await handleEvmLog({ ...ctx, block: block.header, event: item.event })
        }
      }
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

async function handleEvmLog(ctx: EvmLogHandlerContext<Store>) {
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const contractAddress = evmLogArgs.address
  switch (contractAddress) {
    case FACTORY_ADDRESS:
      await handleNewPair(ctx)
      break
    case FOUR_POOL:
      switch (evmLogArgs.topics[0]) {
        case StableSwapContract.events['NewFee(uint256,uint256)'].topic:
          await handleStableSwapNewFee(ctx)
          break
        case StableSwapContract.events['RampA(uint256,uint256,uint256,uint256)'].topic:
          await handleRampA(ctx)
          break
        case StableSwapContract.events['StopRampA(uint256,uint256)'].topic:
          await handleStopRampA(ctx)
          break
        case StableSwapContract.events['AddLiquidity(address,uint256[],uint256[],uint256,uint256)'].topic:
          await handleStableSwapAddLiquidity(ctx)
          break
        case StableSwapContract.events['RemoveLiquidity(address,uint256[],uint256[],uint256)'].topic:
          await handleStableSwapRemoveLiquidity(ctx)
          break
        case StableSwapContract.events['RemoveLiquidityOne(address,uint256,uint256,uint256)'].topic:
          await handleStableSwapRemoveLiquidityOne(ctx)
          break
        case StableSwapContract.events['RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)'].topic:
          await handleStableSwapRemoveLiquidityImbalance(ctx)
          break
        case StableSwapContract.events['TokenExchange(address,uint256,uint256,uint256,uint256)'].topic:
          await handleStableSwapExchange(ctx)
          break
        default:
          break
      }
      break
    default:
      if (await isKnownPairContracts(ctx.store, contractAddress)) {
        switch (evmLogArgs.topics[0]) {
          case pair.events['Transfer(address,address,uint256)'].topic:
            await handleTransfer(ctx)
            break
          case pair.events['Sync(uint112,uint112)'].topic:
            await handleSync(ctx)
            break
          case pair.events['Swap(address,uint256,uint256,uint256,uint256,address)'].topic:
            await handleSwap(ctx)
            break
          case pair.events['Mint(address,uint256,uint256)'].topic:
            await handleMint(ctx)
            break
          case pair.events['Burn(address,uint256,uint256,address)'].topic:
            await handleBurn(ctx)
            break
          default:
            break
        }
      }
  }
}
