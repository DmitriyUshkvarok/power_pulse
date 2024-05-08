import { render, screen, fireEvent } from '@testing-library/react';
import CalendarComponent from '../Calendar/Calendar';

describe('CalendarComponent', () => {
  it('renders calendar when isCalendarOpen is true', () => {
    render(
      <CalendarComponent
        isCalendarOpen={true}
        date={new Date()}
        setDate={() => {}}
        handleCalendarToggle={() => {}}
        setFieldValue={() => {}}
      />
    );
    const calendarContainer = screen.getByTestId('calendar-container');
    expect(calendarContainer).toBeInTheDocument();
  });

  it('does not render calendar when isCalendarOpen is false', () => {
    render(
      <CalendarComponent
        isCalendarOpen={false}
        date={new Date()}
        setDate={() => {}}
        handleCalendarToggle={() => {}}
        setFieldValue={() => {}}
      />
    );
    const calendarContainer = screen.queryByTestId('calendar-container');
    expect(calendarContainer).not.toBeInTheDocument();
  });

  it('calls handleCalendarToggle when backdrop is clicked', () => {
    const handleCalendarToggle = jest.fn();
    render(
      <CalendarComponent
        isCalendarOpen={true}
        date={new Date()}
        setDate={() => {}}
        handleCalendarToggle={handleCalendarToggle}
        setFieldValue={() => {}}
      />
    );
    const backdrop = screen.getByTestId('calendar-backdrop');
    fireEvent.click(backdrop);
    expect(handleCalendarToggle).toHaveBeenCalled();
  });

  it('calls setFieldValue and setDate when a date is selected', () => {
    const setFieldValue = jest.fn();
    const setDate = jest.fn();
    const selectedDate = new Date(2024, 4, 10);
    render(
      <CalendarComponent
        isCalendarOpen={true}
        date={new Date()}
        setDate={setDate}
        handleCalendarToggle={() => {}}
        setFieldValue={setFieldValue}
      />
    );

    const calendarBackdrop = screen.getByTestId('calendar-backdrop');
    fireEvent.click(calendarBackdrop);

    const dayButton = screen.getByRole('button', { name: /10/i });
    fireEvent.click(dayButton);
    expect(setFieldValue).toHaveBeenCalledWith('birthday', '10/05/2024');
    expect(setDate).toHaveBeenCalledWith(selectedDate);
  });
});
