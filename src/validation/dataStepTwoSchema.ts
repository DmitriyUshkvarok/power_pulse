import * as yup from 'yup';

export const dataStepTwoSchema = yup.object().shape({
  bloodGroup: yup.string().required('Blood Group is required'),
  sex: yup.string().required('Sex is required'),
  levelActivity: yup.string().required('Level of Activity is required'),
});
