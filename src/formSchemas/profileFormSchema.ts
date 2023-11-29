import * as yup from 'yup';

export const profilesShema = yup.object().shape({
  name: yup
    .string()
    .min(4, 'Name should be at least 4 characters')
    .max(64, 'Name should not exceed 64 characters')
    .matches(
      /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ0-9.%+\-_]*( [a-zA-Zа-яА-ЯёЁ0-9.%+\-_]+)?$/,
      'Invalid name format'
    )
    .required('name is required'),
  email: yup
    .string()
    .email('Invalid email')
    .test(
      'email-format',
      'Invalid email format',
      (value: string | undefined) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value || '');
      }
    )
    .required(),
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
  birthday: yup.string().required('Birthday is required'),
  bloodGroup: yup.string().required('Blood Group is required'),
  sex: yup.string().required('Sex is required'),
  levelActivity: yup.string().required('Level of Activity is required'),
});
