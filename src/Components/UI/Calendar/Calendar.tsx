import 'react-calendar/dist/Calendar.css';
import styles from './_calendar.module.scss';
import Calendar from 'react-calendar';
import { CalendarComponentProps } from './types';

const CalendarComponent = ({
  isCalendarOpen,
  date,
  setDate,
  handleCalendarToggle,
  setFieldValue,
}: CalendarComponentProps) => {
  const clickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      handleCalendarToggle();
    }
  };

  return (
    <>
      {isCalendarOpen && (
        <div
          className={styles.calendar_backdrop}
          onClick={clickBackdrop}
          data-testid="calendar-backdrop"
        >
          <div
            className={styles.calendarContainer}
            data-testid="calendar-container"
          >
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
