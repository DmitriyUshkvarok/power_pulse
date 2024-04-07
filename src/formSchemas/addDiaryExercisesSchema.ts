import * as yup from 'yup';

export const addDiaryExercisesSchema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required(),
  burnedCalories: yup
    .number()
    .positive('Calories must be a positive number')
    .integer('Calories must be an integer')
    .max(10000, 'Calories must not exceed 10,000')
    .required(),
  bodyPart: yup
    .string()
    .min(3, 'Body part must be at least 3 characters')
    .required(),
  target: yup
    .string()
    .min(3, 'target must be at least 3 characters')
    .required(),
  equipment: yup
    .string()
    .min(3, 'equipment must be at least 3 characters')
    .required(),
  time: yup.string().required(),
});
