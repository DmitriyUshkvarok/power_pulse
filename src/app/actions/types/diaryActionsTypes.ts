export interface CreateDiarySuccessResponse {
  title: string;
  category: string;
  calories: string;
  weight: string;
  recommended: boolean | undefined;
  date: string;
}

export interface CreateDiaryExercisesResponse {
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  time: number;
  burnedCalories: number;
  date: string;
}

export interface getDiaryExercisesResponse {
  _id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  time: number;
  burnedCalories: number;
  date: string;
}

export interface DiaryProduct {
  _id: string;
  title: string;
  category: string;
  calories: string;
  weight: string;
  recommended: boolean | undefined;
  date: string;
}
