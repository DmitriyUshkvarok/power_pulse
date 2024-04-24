import { DiaryProduct } from '@/src/app/actions/types/diaryActionsTypes';

export interface DiaryState {
  diaryProducts: DiaryProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
