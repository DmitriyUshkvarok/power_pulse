import * as yup from 'yup';
import { isAdult } from '../utils/isAdult';

export const dataStepOneSchema = yup.object().shape({
  height: yup
    .number()
    .typeError('Height must be a number')
    .min(150, 'Height should be at least 150 cm')
    .required('Height is required'),
  currentWeight: yup
    .number()
    .typeError('Current Weight must be a number')
    .min(35, 'Current Weight should be at least 35 kg')
    .required('Current Weight is required'),
  desiredWeight: yup
    .number()
    .typeError('Desired Weight must be a number')
    .min(35, 'Desired Weight should be at least 35 kg')
    .required('Desired Weight is required'),
  birthday: yup
    .string()
    .required('Birthday is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: 'Invalid date format. Please use DD/MM/YYYY format.',
      excludeEmptyString: true,
    })
    .test(
      'is-adult',
      'You must be 18 years or older',
      (value: string | undefined) => {
        return isAdult(value || '');
      }
    ),
});
