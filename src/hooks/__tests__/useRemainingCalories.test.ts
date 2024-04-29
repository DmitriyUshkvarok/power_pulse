import { renderHook, waitFor } from '@testing-library/react';
import useRemainingCalories from '../useRemainingCalories';
import { getUserDataById } from '@/src/app/actions/userDataActions';

jest.mock('../redux-hook.ts', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../../utils/formatDate.ts', () => ({
  formatDateString: jest.fn(),
}));

describe('useRemainingCalories', () => {
  it.todo(
    'should return remaining and consumed calories when diaryProducts exist for selected date'
  );
});
