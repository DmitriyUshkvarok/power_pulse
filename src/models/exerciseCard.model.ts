import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const exerciseCardSchema = new Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true,
  },
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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// const ExerciseCard = model('ExerciseCard', exerciseCardSchema);
const ExerciseCard =
  models.exerciseCard || model('exerciseCard', exerciseCardSchema);
export default ExerciseCard;
