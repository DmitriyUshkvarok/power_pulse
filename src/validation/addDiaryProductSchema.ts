import * as yup from 'yup';

export const addDiaryProductSchema = yup.object().shape({
  productName: yup
    .string()
    .min(3, 'product name must be at least 3 characters')
    .required(),
  weight: yup
    .string()
    .max(4, 'the weight must be a maximum of 4 characters ')
    .required(),
});
