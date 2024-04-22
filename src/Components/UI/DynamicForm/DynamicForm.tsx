'use client';
import { Formik, Form, FormikProps } from 'formik';

interface DynamicFormProps {
  initialValues: any;
  validationSchema?: any;
  onSubmit: (values: any) => void;
  children:
    | React.ReactNode
    | ((formikProps: FormikProps<any>) => React.ReactNode);
  enableReinitialize?: boolean;
}

const DynamicForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize = false,
}: DynamicFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => (
        <Form>
          {typeof children === 'function' ? children(formikProps) : children}
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
