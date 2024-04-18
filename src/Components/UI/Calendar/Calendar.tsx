import 'react-calendar/dist/Calendar.css';
import styles from './_calendar.module.scss';
import Calendar from 'react-calendar';

interface CalendarComponentProps {
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

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  isCalendarOpen,
  date,
  setDate,
  handleCalendarToggle,
  setFieldValue,
}) => {
  const clickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      handleCalendarToggle();
    }
  };

  return (
    <>
      {isCalendarOpen && (
        <div className={styles.calendar_backdrop} onClick={clickBackdrop}>
          <div className={styles.calendarContainer}>
            <Calendar
              className={styles.customCalendar}
              onChange={(selectedDate) => {
                if (selectedDate instanceof Date) {
                  setFieldValue(
                    'birthday',
                    selectedDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })
                  );
                  setDate(selectedDate);
                }
              }}
              value={date}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarComponent;
