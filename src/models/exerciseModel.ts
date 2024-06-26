import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const exerciseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Body parts', 'Muscles', 'Equipment'],
      required: true,
    },
  },
  { versionKey: false }
);

const Exercise = models.exercise || model('exercise', exerciseSchema);

export default Exercise;
