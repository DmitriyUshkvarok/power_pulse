export interface CalendarComponentProps {
  isCalendarOpen: boolean;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  handleCalendarToggle: () => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}
