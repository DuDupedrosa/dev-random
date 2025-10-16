import { PlanTypeEnum } from '@/shared/enums/planTypeEnum';
import { getTotalRequestsCount } from '@/shared/helpers/usageHelper';
import { expect } from '@jest/globals';

describe('getTotalRequestsCount', () => {
  it('Should be return the request limit per plan - FREE', () => {
    const plans = Object.values(PlanTypeEnum);

    plans.forEach((plan) => {
      const maxLimit = getTotalRequestsCount(plan.TYPE);
      expect(maxLimit).toBe(plan.MAX_REQUEST_PER_MONTH);
    });
  });

  it('Should be return 0 - invalid plan type', () => {
    const maxLimit = getTotalRequestsCount(10);
    expect(maxLimit).toBe(0);
  });
});
