import { convertSeconds, fullConvertSeconds } from '../convertSeconds';

describe('convertSeconds', () => {
  it('correctly converts seconds to HH:MM format', () => {
    const seconds = 3661;
    const result = convertSeconds(seconds);
    const expectedTime = '01:01';

    expect(result).toBe(expectedTime);
  });

  it('handles zero seconds', () => {
    const seconds = 0;
    const result = convertSeconds(seconds);
    const expectedTime = '00:00';

    expect(result).toBe(expectedTime);
  });

  it('handles large number of seconds', () => {
    const seconds = 86400;
    const result = convertSeconds(seconds);
    const expectedTime = '00:00';

    expect(result).toBe(expectedTime);
  });
});

describe('fullConvertSeconds', () => {
  it('correctly converts seconds to full time format', () => {
    const seconds = 3661;
    const result = fullConvertSeconds(seconds);
    const expectedTime = '01:01:01';
    expect(result).toBe(expectedTime);
  });
  it('handles zero seconds', () => {
    const seconds = 0;
    const result = fullConvertSeconds(seconds);
    const expectedTime = '00:00:00';
    expect(result).toBe(expectedTime);
  });
  it('handles large number of seconds', () => {
    const seconds = 86400;
    const result = fullConvertSeconds(seconds);
    const expectedTime = '00:00:00';
    expect(result).toBe(expectedTime);
  });
});
