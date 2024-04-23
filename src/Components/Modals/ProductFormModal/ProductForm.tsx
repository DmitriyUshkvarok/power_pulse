'use client';
import styles from './_product_form.module.scss';
import Image from 'next/image';
import Container from '../../Container/Container';
import Modal from '../Modal/Modal';
import useModalClose from '@/src/hooks/useModalClose';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import InputField from '../../UI/InputField/InputField';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { createProduct } from '@/src/app/actions/productActions';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { addProductSchema } from '@/src/validation/addProductSchema';
import { useState } from 'react';
import { useAppSelector } from '@/src/hooks/redux-hook';
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
  const handleCloseModal = useModalClose();

  const isCreatedModalOpen = useAppSelector(
    modalsSelectors.getIsCreatedModalOpen
  );

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      await createProduct(values, userId);
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
            <Image
              onClick={handleCloseModal}
              className={styles.closed_icon}
              src="/Icon-closed.svg"
              alt="icon closed modal"
              width={11}
              height={11}
            />
            <DynamicForm
              initialValues={initialValues}
              validationSchema={addProductSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <div className={styles.form_create_product}>
                  <div className={styles.form_group}>
                    <InputField
                      errorClassName={styles.validation_error}
                      className={styles.form_input}
                      type="text"
                      name="name"
                      placeholder="name"
                    />
                  </div>
                  <div className={styles.form_group}>
                    <InputField
                      errorClassName={styles.validation_error}
                      className={styles.form_input}
                      type="text"
                      name="calories"
                      placeholder="calories"
                    />
                  </div>
                  <div className={styles.form_group}>
                    <InputField
                      errorClassName={styles.validation_error}
                      className={styles.form_input}
                      type="text"
                      name="category"
                      placeholder="category"
                    />
                  </div>
                  <div className={styles.form_group}>
                    <InputField
                      errorClassName={styles.validation_error}
                      className={styles.form_input}
                      type="text"
                      name="weight"
                      placeholder="weight"
                    />
                  </div>
                  <div className={styles.form_group}>
                    <InputField
                      errorClassName={styles.validation_error}
                      type="checkbox"
                      name="recommended"
                      checked={formikProps.values.recommended}
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
                  </div>
                  <Button
                    className={styles.create_product_btn}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Create Product'}
                  </Button>
                </div>
              )}
            </DynamicForm>
          </div>
        </Container>
      )}
    </Modal>
  );
};

export default ProductForm;
