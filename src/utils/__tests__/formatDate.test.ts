import { formatDateString, formatDate } from '../formatDate';

describe('formatDateString', () => {
  it('should format date string to dd/MM/yyyy format', () => {
    const dateString = '2024-05-06T12:30:45.678Z';
    const formattedDate = formatDateString(dateString);
    expect(formattedDate).toBe('06/05/2024');
  });
});

describe('formatDate ', () => {
  it('should format date to dd/MM/yyyy format', () => {
    const testDate = new Date('2024-05-06T12:30:45.678Z');

    const expectedFormattedDate = '06/05/2024';

    const formattedDate = formatDate(testDate);

    expect(formattedDate).toBe(expectedFormattedDate);
  });
});
