import { EvmLogHandlerContext } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { BigNumber } from "ethers";
import * as farming from '../abis/farming'
import { FOUR_POOL, FOUR_POOL_LP } from "../consts";
import { getPair } from "../entities/pair";
import { getOrCreateToken } from "../entities/token";
import { Bundle, Farm, Incentive, Pair, SingleTokenLock, SingleTokenLockDayData, SingleTokenLockHourData, StakePosition, User } from "../model";
import { convertTokenToDecimal } from "../utils/helpers";
import { getTimePerBlock } from "../utils/getTimePerBlock";

import { getOrCreateStableSwap } from "../entities/stableSwap";

export async function isPairAddress(
  ctx: EvmLogHandlerContext<Store>,
  token: string
  ) {
  const pair = await ctx.store.get(Pair, token.toLowerCase())
  return !!pair
}

export async function getStakePosition(
  ctx: EvmLogHandlerContext<Store>,
  farmingAddress: string,
  id: string
  ) {
  const item = await ctx.store.get(StakePosition, id)
  return item
}


export async function updateStakePosition(
  ctx: EvmLogHandlerContext<Store>,
  _farmingAddress: string,
  pid: number,
  _user: string,
): Promise<StakePosition | undefined> {
  const farmingAddress = _farmingAddress.toLowerCase()
  const user = _user.toLowerCase()
  const farmId = `${farmingAddress.toLowerCase()}-${pid}`
  const stakePositionId = `${farmingAddress.toLowerCase()}-${pid}-${user.toLowerCase()}`
  let position = await getStakePosition(ctx, farmingAddress, stakePositionId)
  const farm = await ctx.store.get(Farm, farmId)
  const userEntity = await ctx.store.get(User, user.toLowerCase())
  if(!farm || !userEntity)
    return
  if (!position) {
    position = new StakePosition({
      id: stakePositionId,
      farm,
      user: userEntity,
      liquidityStakedBalance: 0n,
    })

    await ctx.store.save(position)
  }

  const farmingContract = new farming.Contract(ctx, farmingAddress)
  const userInfo = await farmingContract.getUserInfo(BigNumber.from(farm.pid), user.toLowerCase())


  const result = userInfo
  position.liquidityStakedBalance = result.amount.toBigInt() ?? 0n;
  await ctx.store.save(position)
  // eslint-disable-next-line consistent-return
  return position;
}

export async function updateSingleTokenLockHourData(
  ctx: EvmLogHandlerContext<Store>,
  singleTokenLock: SingleTokenLock): Promise<SingleTokenLockHourData> {
  const { timestamp } = ctx.block
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
  ctx: EvmLogHandlerContext<Store>,
  singleTokenLock: SingleTokenLock): Promise<SingleTokenLockDayData> {
  const { timestamp } = ctx.block
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


export async function updateFarmingPoolInfo(ctx: EvmLogHandlerContext<Store>,
  farmingAddress: string,
  pid: number
  ) {
  const farmingContract = new farming.Contract(ctx, farmingAddress)
  const poolInfo = await farmingContract.getPoolInfo(BigNumber.from(pid))
  const stakeToken = poolInfo.farmingToken.toLowerCase();

  const liquidityStaked = poolInfo.amount.toBigInt()

  const timePerBlock =  getTimePerBlock(ctx);
  const blocksPerDay = BigInt(((3600 * 1000 * 24) / timePerBlock).toFixed(0))

  let stakeUSD = '0';
  let rewardUSDRate = '0'

  let stakeApr = '0'

  const basicRewardPerDay = await Promise.all(poolInfo.rewardTokens.map(async(item, index) => {
    const token = await getOrCreateToken(ctx, item.toLowerCase())
    if(!token) return undefined;
    const rewardPerDay = poolInfo.rewardPerBlock[index].mul(blocksPerDay)
    const rewardTokenDecimal = convertTokenToDecimal(rewardPerDay.toBigInt(), token.decimals)

    return {
      token,
      rewardPerDay: rewardTokenDecimal
    }
  }));


  const basicRewardEthPerDay = await Promise.all(poolInfo.rewardTokens.map(async(item, index) => {
    const token = await getOrCreateToken(ctx, item.toLowerCase())
    if(!token) return '0';
    const rewardPerDay = poolInfo.rewardPerBlock[index].mul(blocksPerDay)
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

  if(
    FOUR_POOL_LP === stakeToken
    ) {
      // 4 pool
      const stableSwap = (await getOrCreateStableSwap(ctx, FOUR_POOL))!;

      if(stableSwap) {
        bundle = (await ctx.store.get(Bundle, '1'))
        rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
        
        rewardUSDRate = rewardUSDPerDay.toFixed(6)
        const stakedUSD = BigInt(stableSwap.lpTotalSupply) === 0n ? 0 : Number(liquidityStaked) * Number(stableSwap.tvlUSD ?? 0) / Number(BigInt(stableSwap.lpTotalSupply ?? 0))
        stakeUSD = stakedUSD.toFixed(6)
        farmingData = await ctx.store.get(Farm, farmingId)

        if(!farmingData) {
          farmingData = new Farm({
            id: farmingId,
            pid: BigInt(pid),
            stakeToken,
            liquidityStaked: BigInt(liquidityStaked),
            createdAtBlock: BigInt(ctx.block.height),
            createdAtTimestamp: BigInt(ctx.block.timestamp),
            stakedUSD: stakeUSD,
            rewardUSDPerDay: rewardUSDRate,
            stakeApr
          })
        }

        if(!farmingData.stableSwap) {
          // farmingData.pair = null
          // farmingData.singleTokenLock = null
          farmingData.stableSwap = stableSwap
        }
      }
    } else if (isPair) {
      const pair = (await getPair(ctx, stakeToken))!;

      if(pair) {
        bundle = (await ctx.store.get(Bundle, '1'))
        rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
        
        rewardUSDRate = rewardUSDPerDay.toFixed(6)
        const stakedUSD = BigInt(pair.totalSupply) === 0n ? 0 : Number(liquidityStaked) * Number(pair.reserveUSD ?? 0) / Number(BigInt(pair.totalSupply ?? 0))
        stakeUSD = stakedUSD.toFixed(6)
        farmingData = await ctx.store.get(Farm, farmingId)

        if(!farmingData) {
          farmingData = new Farm({
            id: farmingId,
            pid: BigInt(pid),
            stakeToken,
            liquidityStaked: BigInt(liquidityStaked),
            createdAtBlock: BigInt(ctx.block.height),
            createdAtTimestamp: BigInt(ctx.block.timestamp),
            stakedUSD: stakeUSD,
            rewardUSDPerDay: rewardUSDRate,
            stakeApr
          })
        }

        if(!farmingData.pair) {
          farmingData.pair = pair
          // farmingData.singleTokenLock = null
          // farmingData.stableSwap = null
        }
      }
    } else {
      // single token

      const token = await getOrCreateToken(ctx, stakeToken)
      bundle = (await ctx.store.get(Bundle, '1'))

      rewardUSDPerDay = rewardEthPerDay * Number(bundle?.ethPrice ?? 0)
      rewardUSDRate = rewardUSDPerDay.toFixed(6)
      if(!token) return

      let singleTokenLock = await ctx.store.get(SingleTokenLock, {
        where: {
          id: token.id
        }
      })

      if(!singleTokenLock) {
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
      await updateSingleTokenLockHourData(ctx, singleTokenLock)
      await updateSingleTokenLockDayData(ctx, singleTokenLock)
  

      farmingData = await ctx.store.get(Farm, farmingId)
      if(!farmingData) {
        farmingData = new Farm({
          id: farmingId,
          pid: BigInt(pid),
          stakeToken: token.id,
          liquidityStaked,
          createdAtBlock: BigInt(ctx.block.height),
          createdAtTimestamp: BigInt(ctx.block.timestamp),
          stakedUSD: stakeUSD,
          rewardUSDPerDay: rewardUSDRate,
          stakeApr
        })
      }
      if(!farmingData.singleTokenLock) {
        farmingData.singleTokenLock = singleTokenLock
      }
    
    }

  
  if (Number(stakeUSD) !== 0) {
    stakeApr = (((rewardUSDPerDay * 365) / Number(stakeUSD))).toFixed(6)
  }
  if(!farmingData) return

  farmingData.liquidityStaked = BigInt(liquidityStaked)
  farmingData.stakedUSD = stakeUSD
  farmingData.rewardUSDPerDay = rewardUSDRate
  farmingData.stakeApr = stakeApr
  await ctx.store.save(farmingData);

  for (const reward of basicRewardPerDay) {
    if(reward) {
      const fid: string = farmingData.id
      const incentiveId = `${fid}-${reward.token.id}`
      let incentive = await ctx.store.get(Incentive, {
        where: {
          id: incentiveId
        }
      })
      if(!incentive) {
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

export async function handleFarmingPoolAdd(ctx: EvmLogHandlerContext<Store>) { 
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const farmingContract = new farming.Contract(ctx, evmLogArgs.address)
  const poolLength = await farmingContract.poolLength()
  const pid = poolLength.toNumber() - 1
  await updateFarmingPoolInfo(ctx, evmLogArgs.address, pid);
}

export async function handleFarmingStake(ctx: EvmLogHandlerContext<Store>) { 
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const event = farming.events["Stake(address,uint256,uint256)"].decode(evmLogArgs)
  const pid = event.pid.toNumber()
  const {user} = event;
  await updateFarmingPoolInfo(ctx, evmLogArgs.address, pid);
  await updateStakePosition(ctx, evmLogArgs.address, pid, user)

}

export async function handleFarmingRedeem(ctx: EvmLogHandlerContext<Store>) { 
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const event = farming.events["Redeem(address,uint256,uint256)"].decode(evmLogArgs)
  const pid = event.pid.toNumber()
  const {user} = event;
  await updateFarmingPoolInfo(ctx, evmLogArgs.address, pid);
  await updateStakePosition(ctx, evmLogArgs.address, pid, user)
}

export async function handleFarmingClaim(ctx: EvmLogHandlerContext<Store>) { 
  const evmLogArgs = ctx.event.args.log || ctx.event.args;
  const event = farming.events["Claim(address,uint256,address[],uint256[])"].decode(evmLogArgs)
  const pid = event.pid.toNumber()
  const {user} = event;
  await updateFarmingPoolInfo(ctx, evmLogArgs.address, pid);
  await updateStakePosition(ctx, evmLogArgs.address, pid, user)
}
