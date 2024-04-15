'use client';
import styles from './_product_form.module.scss';
import Image from 'next/image';
import Container from '../../Container/Container';
import Modal from '../Modal/Modal';
import useAuthRedirect from '@/src/hooks/useRedirect';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { createProduct } from '@/src/app/actions/productActions';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addProductSchema } from '@/src/validation/addProductSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';

interface FormValues {
  name: string;
  calories: string;
  category: string;
  weight: string;
  recommended: boolean;
}

const initialValues = {
  name: '',
  calories: '',
  category: '',
  weight: '',
  recommended: true,
};

const ProductForm = () => {
  const [loading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;
  const router = useRouter();
  const { handleRedirect } = useAuthRedirect();
  const dispatch = useAppDispatch();

  const isCreatedModalOpen = useAppSelector(
    modalsSelectors.getIsCreatedModalOpen
  );

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

  const handleCloseModal = () => {
    handleRedirect();
    dispatch(closeModal());
  };

  return (
    <Modal>
      {isCreatedModalOpen && (
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
              validationSchema={addProductSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
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
                  <div className={styles.form_group}>
                    <Field
                      type="checkbox"
                      name="recommended"
                      checked={values.recommended}
                      className={styles.product_recommend_check}
                    />
                    <a
                      className={styles.product_recommend_link}
                      href="https://dadamo.com/"
                      target="_blank"
                    >
                      By default, the product will be created with a
                      recommendation for your blood type. To clarify if this
                      product is recommended for your blood type, please follow
                      the link and check the information.
                    </a>
                    <ErrorMessage name="recommended">
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
              )}
            </Formik>
          </div>
        </Container>
      )}
    </Modal>
  );
};

export default ProductForm;
