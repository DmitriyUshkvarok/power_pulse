import {
  calculateDailyRecommendation,
  calculateAge,
} from '../calculateDailyRecommendation';

describe('calculateDailyRecommendation', () => {
  it('calculates BMR correctly for male with sedentary lifestyle', () => {
    const userData = {
      height: '170',
      currentWeight: '60',
      birthday: '26/09/1989',
      sex: 'male',
      levelActivity: 'Sedentary lifestyle',
      desiredWeight: '90',
      bloodGroup: '1',
    };

    const result = calculateDailyRecommendation(userData);
    const expectedBMRMale = (10 * 60 + 6.25 * 170 - 5 * 34 + 5) * 1.2;

    expect(result.recommendedCalories).toBe(expectedBMRMale);
  });

  it('calculates BMR correctly for female with sedentary lifestyle', () => {
    const userData = {
      height: '170',
      currentWeight: '70',
      birthday: '26/09/1989',
      sex: 'female',
      levelActivity: 'Sedentary lifestyle',
      desiredWeight: '60',
      bloodGroup: '3',
    };

    const result = calculateDailyRecommendation(userData);
    const expectedBMRFemale = (10 * 70 + 6.25 * 170 - 5 * 34 - 161) * 1.2;

    expect(result.recommendedCalories).toBe(expectedBMRFemale);
  });

  it('calculates age correctly when birthday is in the past', () => {
    const birthday = '01/01/1990';
    const age = calculateAge(birthday);
    const expectedAge = 34;

    expect(age).toBe(expectedAge);
  });

  it('decrements age correctly if birthday is later in the year', () => {
    const birthday = '01/12/1990';
    const age = calculateAge(birthday);
    const expectedAge = 33;

    expect(age).toBe(expectedAge);
  });

  it('decrements age correctly if birthday is today', () => {
    const birthday = '26/09/1990';
    const age = calculateAge(birthday);
    const expectedAge = 33;

    expect(age).toBe(expectedAge);
  });

  it('does not decrement age if birthday is later in the year and month', () => {
    const birthday = '30/09/1990';
    const age = calculateAge(birthday);
    const expectedAge = 33;

    expect(age).toBe(expectedAge);
  });

  //   it('correctly decrements age if month is negative', () => {
  //     const today = new Date('1990-09-10');
  //     const mockGetFullYear = jest.spyOn(Date.prototype, 'getFullYear');
  //     mockGetFullYear.mockReturnValueOnce(today.getFullYear());
  //     const mockGetMonth = jest.spyOn(Date.prototype, 'getMonth');
  //     mockGetMonth.mockReturnValueOnce(today.getMonth());
  //     const mockGetDate = jest.spyOn(Date.prototype, 'getDate');
  //     mockGetDate.mockReturnValueOnce(today.getDate());

  //     const birthday = '30/09/1990';
  //     const age = calculateAge(birthday);
  //     const expectedAge = 33;

  //     expect(age).toBe(expectedAge);

  //     mockGetFullYear.mockRestore();
  //     mockGetMonth.mockRestore();
  //     mockGetDate.mockRestore();
  //   });

  //   it('correctly decrements age if month is zero and day is negative', () => {
  //     const today = new Date('1990-09-10');
  //     jest.spyOn(global, 'Date').mockImplementationOnce(() => today);

  //     const birthday = '30/09/1990';
  //     const age = calculateAge(birthday);
  //     const expectedAge = 33;

  //     expect(age).toBe(expectedAge);
  //   });
});
