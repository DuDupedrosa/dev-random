import { PlanTypeEnum } from '@/shared/enums/planTypeEnum';
import { userExceededLimit } from '@/shared/helpers/usageHelper';

describe('userExceededLimit', () => {
  const plans = Object.values(PlanTypeEnum);

  it('Should be return true - user exceeded limit', () => {
    plans.forEach((plan) => {
      const exceededLimit = userExceededLimit(
        plan.TYPE,
        plan.MAX_REQUEST_PER_MONTH + 1
      );
      expect(exceededLimit).toBe(true);
    });
  });

  it('Should be return false - user not exceeded limit', () => {
    plans.forEach((plan) => {
      const exceededLimit = userExceededLimit(
        plan.TYPE,
        plan.MAX_REQUEST_PER_MONTH - 1
      );
      expect(exceededLimit).toBe(false);
    });
  });

  it('Should be return true - invalid plan type', () => {
    plans.forEach((plan) => {
      const exceededLimit = userExceededLimit(
        10,
        plan.MAX_REQUEST_PER_MONTH - 1
      );
      expect(exceededLimit).toBe(true);
    });
  });
});
