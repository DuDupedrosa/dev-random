import { PlanTypeEnum } from '@/shared/enums/planTypeEnum';
import { getPercentageUsage } from '@/shared/helpers/usageHelper';

describe('getPercentageUsage', () => {
  it('Should be return a percentage value', () => {
    const plans = Object.values(PlanTypeEnum);

    plans.forEach((plan) => {
      const value = getPercentageUsage(
        plan.TYPE,
        plan.MAX_REQUEST_PER_MONTH / 2
      );
      expect(value).not.toBe(0);
    });
  });
});
