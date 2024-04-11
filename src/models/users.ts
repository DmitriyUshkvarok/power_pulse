import mongoose, { Schema, models, model } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: string;
  products: Array<Schema.Types.ObjectId>;
  diarys: Array<Schema.Types.ObjectId>;
  exerciseCards: Array<Schema.Types.ObjectId>;
  diaryExercises: Array<Schema.Types.ObjectId>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    image: String,
    role: {
      type: String,
      default: 'user',
    },
    provider: {
      type: String,
      default: 'credentials',
    },
    userData: {
      type: Schema.Types.ObjectId,
      ref: 'UserData',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
    diarys: [
      {
        type: Schema.Types.ObjectId,
        ref: 'diary',
      },
    ],
    exerciseCards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ExerciseCard',
      },
    ],
    diaryExercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DiaryExercises',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const User = models.user || model('user', userSchema);

export default User;
