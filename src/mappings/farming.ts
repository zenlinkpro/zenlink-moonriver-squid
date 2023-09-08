import { BigNumber } from "@ethersproject/bignumber";
import * as farming from '../abis/farming'
import { FOUR_POOL, FOUR_POOL_LP } from "../consts";
import { getPair } from "../entities/pair";
import { getOrCreateToken } from "../entities/token";
import {
  Bundle,
  Farm,
  Incentive,
  Pair,
  SingleTokenLock,
  SingleTokenLockDayData,
  SingleTokenLockHourData,
  StakePosition,
  User
} from "../model";
import { convertTokenToDecimal } from "../utils/helpers";
import { getTimePerBlock } from "../utils/getTimePerBlock";

import { getOrCreateStableSwap } from "../entities/stableSwap";
import { Context, Log } from "../processor";

export async function isPairAddress(ctx: Context, token: string) {
  const pair = await ctx.store.get(Pair, token.toLowerCase())
  return !!pair
}

export async function getStakePosition(ctx: Context, id: string) {
  const item = await ctx.store.get(StakePosition, id)
  return item
}


export async function updateStakePosition(
  ctx: Context,
  log: Log,
  _farmingAddress: string,
  pid: number,
  _user: string,
): Promise<StakePosition | undefined> {
  const farmingAddress = _farmingAddress.toLowerCase()
  const user = _user.toLowerCase()
  const farmId = `${farmingAddress.toLowerCase()}-${pid}`
  const stakePositionId = `${farmingAddress.toLowerCase()}-${pid}-${user.toLowerCase()}`
  let position = await getStakePosition(ctx, stakePositionId)
  const farm = await ctx.store.get(Farm, farmId)
  const userEntity = await ctx.store.get(User, user.toLowerCase())
  if (!farm || !userEntity)
    return undefined
  if (!position) {
    position = new StakePosition({
      id: stakePositionId,
      farm,
      user: userEntity,
      liquidityStakedBalance: 0n,
    })

    await ctx.store.save(position)
  }

  const farmingContract = new farming.Contract({ ...ctx, block: log.block }, farmingAddress)
  const userInfo = await farmingContract.getUserInfo(farm.pid, user.toLowerCase())


  const result = userInfo
  position.liquidityStakedBalance = result.amount ?? 0n;
  await ctx.store.save(position)
  return position;
}

export async function updateSingleTokenLockHourData(
  ctx: Context,
  log: Log,
  singleTokenLock: SingleTokenLock
): Promise<SingleTokenLockHourData> {
  const { timestamp } = log.block
  const hourIndex = parseInt((timestamp / 3600000).toString(), 10)
  const hourStartUnix = Number(hourIndex) * 3600000
  const dayPairID = `${singleTokenLock.id}-${hourIndex}`
  let hourData = await ctx.store.get(SingleTokenLockHourData, dayPairID)
  if (!hourData) {
    hourData = new SingleTokenLockHourData({
      id: dayPairID,
      hourStartUnix: BigInt(hourStartUnix),
      singleTokenLock,
      totalLiquidity: '0',
      totalLiquidityETH: '0',
      totalLiquidityUSD: '0',
    })
  }
  hourData.totalLiquidity = singleTokenLock.totalLiquidity
  hourData.totalLiquidityETH = singleTokenLock.totalLiquidityETH
  hourData.totalLiquidityUSD = singleTokenLock.totalLiquidityUSD
  await ctx.store.save(hourData)
  return hourData
}


export async function updateSingleTokenLockDayData(
  ctx: Context,
  log: Log,
  singleTokenLock: SingleTokenLock
): Promise<SingleTokenLockDayData> {
  const { timestamp } = log.block
  const dayID = parseInt((timestamp / 86400000).toString(), 10)
  const dayStartTimestamp = Number(dayID) * 86400000
  const dayPairID = `${singleTokenLock.id}-${dayID}`
  let dayData = await ctx.store.get(SingleTokenLockDayData, dayPairID)
  if (!dayData) {
    dayData = new SingleTokenLockDayData({
      id: dayPairID,
      date: new Date(dayStartTimestamp),
      singleTokenLock,
      totalLiquidity: '0',
      totalLiquidityETH: '0',
      totalLiquidityUSD: '0',
    })
  }
  dayData.totalLiquidity = singleTokenLock.totalLiquidity
  dayData.totalLiquidityETH = singleTokenLock.totalLiquidityETH
  dayData.totalLiquidityUSD = singleTokenLock.totalLiquidityUSD
  await ctx.store.save(dayData)
  return dayData
}


export async function updateFarmingPoolInfo(
  ctx: Context,
  log: Log,
  farmingAddress: string,
  pid: number
) {
  const farmingContract = new farming.Contract({ ...ctx, block: log.block }, farmingAddress)
  const poolInfo = await farmingContract.getPoolInfo(BigInt(pid))
  const stakeToken = poolInfo.farmingToken.toLowerCase();

  const liquidityStaked = poolInfo.amount

  const timePerBlock = getTimePerBlock(ctx, log);
  const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

  let stakeUSD = '0';
  let rewardUSDRate = '0'

  let stakeApr = '0'

  const basicRewardPerDay = await Promise.all(poolInfo.rewardTokens.map(async (item, index) => {
    const token = await getOrCreateToken(ctx, log, item.toLowerCase())
    if (!token) return undefined;
    const rewardPerDay = BigNumber.from(poolInfo.rewardPerBlock[index]).mul(blocksPerDay)
    const rewardTokenDecimal = convertTokenToDecimal(rewardPerDay.toBigInt(), token.decimals)

    return {
      token,
      rewardPerDay: rewardTokenDecimal
    }
  }));


  const basicRewardEthPerDay = await Promise.all(poolInfo.rewardTokens.map(async (item, index) => {
    const token = await getOrCreateToken(ctx, log, item.toLowerCase())
    if (!token) return '0';
    const rewardPerDay = BigNumber.from(poolInfo.rewardPerBlock[index]).mul(blocksPerDay)
    const rewardTokenDecimal = convertTokenToDecimal(rewardPerDay.toBigInt(), token.decimals)
    const rewardEth = rewardTokenDecimal.times(token.derivedETH).toFixed(6)
    return rewardEth
  }));

  const rewardEthPerDay = basicRewardEthPerDay.reduce((total, cur) => {
    return total + Number(cur)
  }, 0)

  let bundle = (await ctx.store.get(Bundle, '1'))
  let rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

  const isPair = await isPairAddress(ctx, stakeToken)

  let farmingData: Farm | undefined

  const farmingId = `${farmingAddress}-${pid}`.toLowerCase()

  if (
    FOUR_POOL_LP === stakeToken
  ) {
    // 4 pool
    const stableSwap = (await getOrCreateStableSwap(ctx, log, FOUR_POOL))!;

    if (stableSwap) {
      bundle = (await ctx.store.get(Bundle, '1'))
      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      const stakedUSD = BigInt(stableSwap.lpTotalSupply) === 0n ? 0 : Number(liquidityStaked) * Number(stableSwap.tvlUSD ?? 0) / Number(BigInt(stableSwap.lpTotalSupply ?? 0))
      stakeUSD = stakedUSD.toFixed(6)
      farmingData = await ctx.store.get(Farm, farmingId)

      if (!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken,
          liquidityStaked: BigInt(liquidityStaked),
          createdAtBlock: BigInt(log.block.height),
          createdAtTimestamp: BigInt(log.block.timestamp),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr
        })
      }

      if (!farmingData.stableSwap) {
        farmingData.stableSwap = stableSwap
      }
    }
  } else if (isPair) {
    const pair = (await getPair(ctx, stakeToken))!;

    if (pair) {
      bundle = (await ctx.store.get(Bundle, '1'))
      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)

      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      const stakedUSD = BigInt(pair.totalSupply) === 0n ? 0 : Number(liquidityStaked) * Number(pair.reserveUSD ?? 0) / Number(BigInt(pair.totalSupply ?? 0))
      stakeUSD = stakedUSD.toFixed(6)
      farmingData = await ctx.store.get(Farm, farmingId)

      if (!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken,
          liquidityStaked: BigInt(liquidityStaked),
          createdAtBlock: BigInt(log.block.height),
          createdAtTimestamp: BigInt(log.block.timestamp),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr
        })
      }

      if (!farmingData.pair) {
        farmingData.pair = pair
      }
    }
  } else {
    // single token
    let token
    try {
      token = await getOrCreateToken(ctx, log, stakeToken)
      if (token.symbol === 'ZLK-LP') return
    } catch (error) {
      return
    }

    bundle = (await ctx.store.get(Bundle, '1'))

    rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
    rewardUSDRate = rewardUSDPerDay.toFixed(6)
    if (!token) return

    let singleTokenLock = await ctx.store.get(SingleTokenLock, {
      where: {
        id: token.id
      }
    })

    if (!singleTokenLock) {
      singleTokenLock = new SingleTokenLock({
        id: token.id,
        token,
        totalLiquidity: '0',
        totalLiquidityETH: '0',
        totalLiquidityUSD: '0'
      })
    }
    const stakeTokenDecimal = convertTokenToDecimal(BigInt(liquidityStaked), token.decimals)

    const stakedUSD = stakeTokenDecimal.times(token.derivedETH).times(bundle?.ethPrice ?? 0);
    stakeUSD = stakedUSD.toFixed(6)
    singleTokenLock.totalLiquidity = liquidityStaked.toString()
    singleTokenLock.totalLiquidityETH = stakeTokenDecimal.times(token.derivedETH).toFixed(6)
    singleTokenLock.totalLiquidityUSD = stakeUSD
    await ctx.store.save(singleTokenLock);
    await updateSingleTokenLockHourData(ctx, log, singleTokenLock)
    await updateSingleTokenLockDayData(ctx, log, singleTokenLock)


    farmingData = await ctx.store.get(Farm, farmingId)
    if (!farmingData) {
      farmingData = new Farm({
        id: farmingId,
        pid: BigInt(pid),
        stakeToken: token.id,
        liquidityStaked,
        createdAtBlock: BigInt(log.block.height),
        createdAtTimestamp: BigInt(log.block.timestamp),
        stakedUSD: stakeUSD,
        rewardUSDPerDay: rewardUSDRate,
        stakeApr
      })
    }
    if (!farmingData.singleTokenLock) {
      farmingData.singleTokenLock = singleTokenLock
    }

  }


  if (Number(stakeUSD) !== 0) {
    stakeApr = (((rewardUSDPerDay * 365) / Number(stakeUSD))).toFixed(6)
  }
  if (!farmingData) return

  farmingData.liquidityStaked = BigInt(liquidityStaked)
  farmingData.stakedUSD = stakeUSD
  farmingData.rewardUSDPerDay = rewardUSDRate
  farmingData.stakeApr = stakeApr
  await ctx.store.save(farmingData);

  for (const reward of basicRewardPerDay) {
    if (reward) {
      const fid: string = farmingData.id
      const incentiveId = `${fid}-${reward.token.id}`
      let incentive = await ctx.store.get(Incentive, {
        where: {
          id: incentiveId
        }
      })
      if (!incentive) {
        incentive = new Incentive({
          id: incentiveId,
          farm: farmingData,
          rewardToken: reward.token,
          rewardPerDay: reward.rewardPerDay.toFixed(6)
        })
      }
      incentive.rewardPerDay = reward.rewardPerDay.toFixed(6)
      await ctx.store.save(incentive)
    }
  }
}

export async function handleFarmingPoolAdd(ctx: Context, log: Log) {
  const farmingContract = new farming.Contract({ ...ctx, block: log.block }, log.address)
  const poolLength = await farmingContract.poolLength()
  const pid = Number(poolLength) - 1
  await updateFarmingPoolInfo(ctx, log, log.address, pid);
}

export async function handleFarmingStake(ctx: Context, log: Log) {
  const event = farming.events.Stake.decode(log)
  const pid = Number(event.pid)
  const { user } = event;
  await updateFarmingPoolInfo(ctx, log, log.address, pid);
  await updateStakePosition(ctx, log, log.address, pid, user)

}

export async function handleFarmingRedeem(ctx: Context, log: Log) {
  const event = farming.events.Redeem.decode(log)
  const pid = Number(event.pid)
  const { user } = event;
  await updateFarmingPoolInfo(ctx, log, log.address, pid);
  await updateStakePosition(ctx, log, log.address, pid, user)
}

export async function handleFarmingClaim(ctx: Context, log: Log) {
  const event = farming.events.Claim.decode(log)
  const pid = Number(event.pid)
  const { user } = event;
  await updateFarmingPoolInfo(ctx, log, log.address, pid);
  await updateStakePosition(ctx, log, log.address, pid, user)
}
