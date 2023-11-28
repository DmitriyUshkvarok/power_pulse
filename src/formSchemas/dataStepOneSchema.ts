import * as yup from 'yup';

export const dataStepOneSchema = yup.object().shape({
  height: yup.string().required('Height is required'),
  currentWeight: yup.string().required('Current Weight is required'),
  desiredWeight: yup.string().required('Desired Weight is required'),
  birthday: yup.string().required('Birthday is required'),
});
