import * as yup from 'yup';

export const profilesShema = yup.object().shape({
  name: yup.string().required(),
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
  height: yup.string().required('Height is required'),
  currentWeight: yup.string().required('Current Weight is required'),
  desiredWeight: yup.string().required('Desired Weight is required'),
  birthday: yup.string().required('Birthday is required'),
  bloodGroup: yup.string().required('Blood Group is required'),
  sex: yup.string().required('Sex is required'),
  levelActivity: yup.string().required('Level of Activity is required'),
});
