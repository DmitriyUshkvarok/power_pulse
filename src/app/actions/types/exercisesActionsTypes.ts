export interface ExerciseList {
  _id: string;
  title: string;
  imageURL: string;
  category: string;
}

export interface ExerciseData {
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
  equipment: string;
}

export interface ExerciseCardData {
  _id: string;
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
  exercisesId: string;
  equipment: string;
  video: string;
}
