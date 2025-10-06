import { PlanTypeEnum } from "../enums/planTypeEnum";

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
  const total = getTotalRequestsCount(planType);
  return total > 0 ? Math.floor((count / total) * 100) : 0;
}

export function userExceededLimit(planType: number, count: number) {
  if (planType === PlanTypeEnum.FREE.TYPE) {
    return count > PlanTypeEnum.FREE.MAX_REQUEST_PER_MONTH;
  }

  return false;
}
