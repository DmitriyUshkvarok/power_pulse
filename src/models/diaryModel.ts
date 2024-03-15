import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface DiaryDocument {
  title: string;
  category: string;
  calories: string;
  weight: number;
  recommended: boolean;
  date: string;
}

const diarySchema = new Schema<DiaryDocument>({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
});

const Diary = models.diary || model('diary', diarySchema);

export default Diary;
