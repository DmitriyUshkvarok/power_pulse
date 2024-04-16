'use client';
import styles from './_add_diary_modal.module.scss';
import Image from 'next/image';
import Container from '../../Container/Container';
import WellDoneDiaryModal from '../WellDoneDiaryModal/WellDoneDiaryModal';
import useRouterPush from '@/src/hooks/useRouter';
import Modal from '../Modal/Modal';
import useModalClose from '@/src/hooks/useModalClose';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addDiaryProductSchema } from '@/src/validation/addDiaryProductSchema';
import { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux-hook';
import { createDiary } from '@/src/app/actions/diaryActions';
import { UserSession } from '../../Profile/ProfileForm';
import { useSession } from 'next-auth/react';
import { formatDate } from '@/src/utils/formatDate';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { setDynamicCalories } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { openWellDoneDiaryModal } from '@/src/redux/modalSlice/modalSlice';
interface FormValues {
  productName: string;
  weight: string;
  calories: string;
}

const AddDiaryModal = () => {
  const { data: session } = useSession();
  const [loading, setIsLoading] = useState(false);
  const formRef = useRef<any>(null);
  const userId = (session?.user as UserSession)?._id;
  const dispatch = useAppDispatch();
  const { pushRoute } = useRouterPush();
  const handleCloseModal = useModalClose();

  const selectSelectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );
  const isWellDoneDiaryModalOpen = useAppSelector(
    modalsSelectors.getWellDoneDiaryModalOpen
  );

  const isAddDiaryModalOpen = useAppSelector(
    modalsSelectors.getIsAddDiaryModalOpen
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
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    try {
      setIsLoading(true);
      const diaryData = {
        title: values.productName,
        weight: values.weight,
        calories: values.calories,
        date: formattedDate,
        category: selectSelectedProduct?.category || '',
        recommended: selectSelectedProduct?.recommended,
      };
      const response = await createDiary(diaryData, userId);

      if (response) {
        dispatch(setDynamicCalories(values.calories));
        pushRoute('/add-diary?well-done');
        dispatch(openWellDoneDiaryModal());
      }
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

  return (
    <Modal>
      {isAddDiaryModalOpen && (
        <Container>
          {isWellDoneDiaryModalOpen ? (
            <WellDoneDiaryModal />
          ) : (
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
                      <div className={styles.calories_count_span}>
                        Calories:
                      </div>
                      <Field
                        type="text"
                        name="calories"
                        className={styles.calories_count}
                        readOnly
                      />
                    </div>
                    <div className={styles.btn_group}>
                      <button
                        className={styles.add_diary_product_btn}
                        type="submit"
                      >
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
          )}
        </Container>
      )}
    </Modal>
  );
};

export default AddDiaryModal;
