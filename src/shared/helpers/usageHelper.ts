import { PlanTypeEnum } from '../enums/planTypeEnum';

export function getFreeRequestsCount(count: number, planType: number) {
  const plans = Object.values(PlanTypeEnum);
  const findPlan = plans.find((p) => p.TYPE === planType);

  if (!findPlan) return 0;

  return findPlan.MAX_REQUEST_PER_MONTH - count;
}

export function getTotalRequestsCount(planType: number) {
  const plans = Object.values(PlanTypeEnum);
  const findPlan = plans.find((p) => p.TYPE === planType);

  if (!findPlan) return 0;

  return findPlan.MAX_REQUEST_PER_MONTH;
}

export function getPercentageUsage(planType: number, count: number) {
  try {
    const total = getTotalRequestsCount(planType);
    return total > 0 ? Math.floor((count / total) * 100) : 0;
  } catch (error) {
    void error;
    return 0;
  }
}

export function userExceededLimit(planType: number, count: number) {
  const plans = Object.values(PlanTypeEnum);
  const findPlan = plans.find((p) => p.TYPE === planType);

  if (!findPlan) return true;

  return count > findPlan.MAX_REQUEST_PER_MONTH;
}
