import { UserData } from '../redux/userData/userDataSlice';

export interface DailyRecommendation {
  recommendedCalories: number;
  recommendedSportTime: number;
}

export const calculateDailyRecommendation = (
  userData: UserData
): DailyRecommendation => {
  const { height, currentWeight, birthday, sex, levelActivity } = userData;

  // Перетворення рядків в числа, де необхідно
  const heightInCm = parseFloat(height);
  const currentWeightInKg = parseFloat(currentWeight);
  const age = calculateAge(birthday);

  // Обчислення BMR
  const sexLowerCase = sex.toLowerCase();
  let bmr: number;
  if (sexLowerCase === 'male') {
    bmr =
      (10 * currentWeightInKg + 6.25 * heightInCm - 5 * age + 5) *
      activityCoefficients[levelActivity];
  } else {
    bmr =
      (10 * currentWeightInKg + 6.25 * heightInCm - 5 * age - 161) *
      activityCoefficients[levelActivity];
  }

  // Обчислення рекомендованих калорій
  const recommendedCalories = calculateRecommendedCalories(
    bmr
  );

  // Обчислення рекомендованого часу спорту
  const recommendedSportTime = 110;

  return { recommendedCalories, recommendedSportTime };
};

// Функція для обчислення віку
const calculateAge = (birthday: string): number => {
  const today = new Date();
  const birthDateParts = birthday.split('/').map((part) => parseInt(part));
  const birthDate = new Date(
    birthDateParts[2],
    birthDateParts[1] - 1,
    birthDateParts[0]
  );
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  const day = today.getDate() - birthDate.getDate();
  if (month < 0 || (month === 0 && day < 0)) {
    age--;
  }
  return age;
};

// Коефіцієнти активності, які ви вказали у завданні
const activityCoefficients: { [key: string]: number } = {
  'Sedentary lifestyle': 1.2,
  'Light activity': 1.375,
  'Moderately active': 1.55,
  'Very active': 1.725,
  'Extremely active': 1.9,
};

// Функція для обчислення рекомендованих калорій
const calculateRecommendedCalories = (bmr: number): number => {
  const recommendedCalories = bmr;
  return recommendedCalories;
};
