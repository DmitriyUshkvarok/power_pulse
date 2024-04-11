import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface DiaryExercisesDocument {
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  time: number;
  burnedCalories: number;
}

const diaryExercisesSchema = new Schema<DiaryExercisesDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    bodyPart: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    burnedCalories: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const DiaryExercises =
  models.diaryExercises || model('diaryExercises', diaryExercisesSchema);

export default DiaryExercises;
