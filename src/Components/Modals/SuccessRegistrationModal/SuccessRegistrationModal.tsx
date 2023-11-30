import styles from './_SuccessRegistrationModal.module.scss';
import { SuccessRegistrationModalProps } from './index';

const SuccessRegistrationModal: React.FC<SuccessRegistrationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  values,
}) => {
  const handleConfirm = () => {
    onConfirm(values);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2 className={styles.confirm_title}>Registration Confirmation</h2>
            <p className={styles.confirm_success_text}>
              Congratulations! Registration was successful.
            </p>
            <button className={styles.confirm_btn} onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessRegistrationModal;
