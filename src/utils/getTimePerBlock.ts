import { EvmLogHandlerContext } from '@subsquid/substrate-processor'
import { Store } from "@subsquid/typeorm-store";

const BLOCK_RECORD = {
  pre: {
    blockHeight: 0,
    timestamp: 0,
  },
  middle: {
    blockHeight: 0,
    timestamp: 0,
  },
  cur: {
    blockHeight: 0,
    timestamp: 0,
  }
}

export function getTimePerBlock(ctx: EvmLogHandlerContext<Store>,):number {

  if(BLOCK_RECORD.pre.blockHeight === 0 ){
    BLOCK_RECORD.pre.blockHeight = ctx.block.height
    BLOCK_RECORD.pre.timestamp = ctx.block.timestamp

    BLOCK_RECORD.middle.blockHeight = ctx.block.height
    BLOCK_RECORD.middle.timestamp = ctx.block.timestamp

  }

  BLOCK_RECORD.cur.blockHeight = ctx.block.height
  BLOCK_RECORD.cur.timestamp = ctx.block.timestamp


  const blockDiff = BLOCK_RECORD.cur.blockHeight - BLOCK_RECORD.pre.blockHeight;

  const blockMidDiff = BLOCK_RECORD.cur.blockHeight - BLOCK_RECORD.middle.blockHeight;


  if(blockDiff > 10000 && blockMidDiff > 5000){
    BLOCK_RECORD.pre.blockHeight = BLOCK_RECORD.middle.blockHeight
    BLOCK_RECORD.pre.timestamp = BLOCK_RECORD.middle.timestamp

    BLOCK_RECORD.middle.blockHeight = ctx.block.height
    BLOCK_RECORD.middle.timestamp = ctx.block.timestamp
  }


  const blocks = BLOCK_RECORD.cur.blockHeight - BLOCK_RECORD.pre.blockHeight;

  const currentTimestamp = BLOCK_RECORD.cur.timestamp;
  const anchorTimestamp = BLOCK_RECORD.pre.timestamp;

  const averageBlock = (currentTimestamp - anchorTimestamp) / blocks

  if(blocks <= 0) return 12000

  return averageBlock
 
}

