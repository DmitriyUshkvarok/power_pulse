import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const exerciseCardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    burnedCalories: {
      type: Number,
      required: true,
    },
    bodyPart: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    exercisesId: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const ExerciseCard =
  models.exerciseCard || model('exerciseCard', exerciseCardSchema);
export default ExerciseCard;
