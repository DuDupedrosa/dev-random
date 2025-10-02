import { PlanTypeEnum } from '../enums/planTypeEnum';

export function getFreeRequestsCount(count: number, planType: number) {
  if (planType === PlanTypeEnum.FREE.TYPE) {
    return PlanTypeEnum.FREE.MAX_REQUEST_PER_MONTH - count;
  }

  return 0;
}

export function getTotalRequestsCount(planType: number) {
  if (planType === PlanTypeEnum.FREE.TYPE) {
    return PlanTypeEnum.FREE.MAX_REQUEST_PER_MONTH;
  }

  return 0;
}

export function getPercentageUsage(planType: number, count: number) {
  return getTotalRequestsCount(planType) > 0
    ? (count / getTotalRequestsCount(planType)) * 100
    : 0;
}

export function userExceededLimit(planType: number, count: number) {
  if (planType === PlanTypeEnum.FREE.TYPE) {
    return count > PlanTypeEnum.FREE.MAX_REQUEST_PER_MONTH;
  }

  return false;
}
