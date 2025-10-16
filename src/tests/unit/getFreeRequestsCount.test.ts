import { PlanTypeEnum } from '@/shared/enums/planTypeEnum';
import { getFreeRequestsCount } from '@/shared/helpers/usageHelper';
import { expect } from '@jest/globals';

describe('getFreeRequestsCount', () => {
  const plans = Object.values(PlanTypeEnum);

  it('Should be return a correct value of free requests by plan', () => {
    plans.forEach((plan) => {
      const half = plan.MAX_REQUEST_PER_MONTH / 2;
      const freeRequests = getFreeRequestsCount(half, plan.TYPE);
      expect(freeRequests).toBe(half);
    });
  });

  it('Should be return 0 ( max plan limit exceeded )', () => {
    plans.forEach((plan) => {
      const freeRequests = getFreeRequestsCount(
        plan.MAX_REQUEST_PER_MONTH,
        plan.TYPE
      );
      expect(freeRequests).toBe(0);
    });
  });

  it('Should be return 0 - Invalid plan type', () => {
    const freeRequests = getFreeRequestsCount(
      PlanTypeEnum.FREE.MAX_REQUEST_PER_MONTH,
      10
    );
    expect(freeRequests).toBe(0);
  });
});
