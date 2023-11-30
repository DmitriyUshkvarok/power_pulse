export interface SuccessRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: any) => void; // Замените "any" на конкретный тип значений
  values: any; // Замените "any" на конкретный тип значений
}
