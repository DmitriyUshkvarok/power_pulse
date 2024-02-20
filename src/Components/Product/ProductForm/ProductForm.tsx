'use client';
import styles from './_product_form.module.scss';
import Container from '../../Container/Container';
import { createProduct } from '@/src/app/actions/productActions';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addProductSchema } from '@/src/formSchemas/addProductSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormValues {
  name: string;
  calories: string;
  category: string;
  quantity: string;
}

const initialValues = {
  name: '',
  calories: '',
  category: '',
  quantity: '',
};

const ProductForm = () => {
  const [loading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const response = await createProduct(values, userId);
      if (response) {
        router.back();
      }
    } catch (error) {
      console.log('Error in product form submission', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.form_container}>
        <Formik
          initialValues={initialValues}
          validationSchema={addProductSchema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form_create_product}>
            <div className={styles.form_group}>
              <Field
                className={styles.form_input}
                type="text"
                name="name"
                placeholder="name"
              />
              <ErrorMessage name="name">
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
                name="calories"
                placeholder="calories"
              />
              <ErrorMessage name="calories">
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
                name="category"
                placeholder="category"
              />
              <ErrorMessage name="category">
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
                name="quantity"
                placeholder="quantity"
              />
              <ErrorMessage name="quantity">
                {(msg) => (
                  <div className={styles.validation_error}>
                    <span>{msg}</span>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <button className={styles.create_product_btn} type="submit">
              {loading ? 'Loading...' : 'Create Product'}
            </button>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default ProductForm;
