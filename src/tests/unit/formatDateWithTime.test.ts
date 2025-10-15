import { formatDateWithTime } from '@/shared/helpers/dateHelper';

describe('formatDateWithTime', () => {
  it('Should be return a valid formatted date', () => {
    const date = formatDateWithTime(new Date());
    expect(date).toEqual(expect.any(String));
    expect(date).not.toBe('Invalid date');
  });

  it('Should be return a string Invalid Date', () => {
    const date = formatDateWithTime('Invalid value');
    expect(date).toEqual(expect.any(String));
    expect(date).toBe('Invalid date');
  });
});
