import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

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
  },
  { timestamps: true }
);

const User = models.user || model('user', userSchema);

export default User;
