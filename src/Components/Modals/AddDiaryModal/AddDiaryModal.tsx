'use client';
import styles from './_add_diary_modal.module.scss';
import Container from '../../Container/Container';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addDiaryProductSchema } from '@/src/formSchemas/addDiaryProductSchema';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/src/hooks/redux-hook';

interface FormValues {
  productName: string;
  weight: string;
  calories: string;
}

const AddDiaryModal = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef<any>(null);

  const selectSelectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  const initialValues = {
    productName: selectSelectedProduct?.name || '',
    weight: selectSelectedProduct?.weight || '',
    calories: selectSelectedProduct?.calories || '',
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log(values);
      setIsLoading(true);
    } catch (error) {
      console.log('Error in product form submission', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    const weight = parseFloat(e.target.value) || 0;
    const caloriesString = selectSelectedProduct?.calories || '0';
    const calories = parseFloat(caloriesString) || 0;
    const calculatedCalories = (weight * calories) / 100;

    setFieldValue('weight', e.target.value);
    setFieldValue('calories', calculatedCalories.toFixed(2));
  };

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <Container>
      <div className={styles.form_container}>
        <Image
          onClick={handleCloseModal}
          className={styles.closed_icon}
          src="/Icon-closed.svg"
          alt="icon closed modal"
          width={11}
          height={11}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={addDiaryProductSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ setFieldValue }) => (
            <Form className={styles.form_add_diary_product}>
              <div className={styles.inputs_group}>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="productName"
                    placeholder="product name"
                  />
                  <ErrorMessage name="productName">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="weight"
                    placeholder="weight"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleWeightChange(e, setFieldValue)
                    }
                  />
                  <ErrorMessage name="weight">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className={styles.calories_count_wrapper}>
                <div className={styles.calories_count_span}>Calories:</div>
                <Field
                  type="text"
                  name="calories"
                  className={styles.calories_count}
                  readOnly
                />
              </div>
              <div className={styles.btn_group}>
                <button className={styles.add_diary_product_btn} type="submit">
                  {loading ? 'Loading...' : 'Add to diary'}
                </button>
                <button
                  className={styles.cancel_diary_product_btn}
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default AddDiaryModal;
