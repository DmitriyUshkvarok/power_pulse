export interface Exercise {
  _id: string;
  title: string;
  imageURL: string;
  category: string;
}

export interface ExerciseState {
  exercises: Exercise[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
