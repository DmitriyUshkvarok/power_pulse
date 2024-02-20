import * as yup from 'yup';

export const addProductSchema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required(),
  calories: yup
    .number()
    .positive('Calories must be a positive number')
    .integer('Calories must be an integer')
    .max(10000, 'Calories must not exceed 10,000')
    .required(),
  category: yup
    .string()
    .min(3, 'Category must be at least 3 characters')
    .required(),
  quantity: yup
    .number()
    .positive('Quantity must be a positive number')
    .integer('Quantity must be an integer')
    .max(1000, 'Quantity must not exceed 1,000')
    .required(),
});
