'use client';
import styles from './_product_form.module.scss';
import Container from '../../Container/Container';
import Modal from '../../Modals/Modal/Modal';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { createProduct } from '@/src/app/actions/productActions';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addProductSchema } from '@/src/formSchemas/addProductSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppSelector } from '@/src/hooks/redux-hook';

interface FormValues {
  name: string;
  calories: string;
  category: string;
  weight: string;
}

const initialValues = {
  name: '',
  calories: '',
  category: '',
  weight: '',
};

const ProductForm = () => {
  const [loading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;
  const router = useRouter();
  const userData = useAppSelector((state) => state.userData.data);

  const isCreatedModalOpen = useAppSelector(
    modalsSelectors.getIsCreatedModalOpen
  );

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const response = await createProduct(values, userId, userData);
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
    <Modal>
      {isCreatedModalOpen && (
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
                    name="weight"
                    placeholder="weight"
                  />
                  <ErrorMessage name="weight">
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
      )}
    </Modal>
  );
};

export default ProductForm;
