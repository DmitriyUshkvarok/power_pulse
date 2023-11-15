import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userDataSchema = new Schema(
  {
    height: {
      type: String,
    },
    currentWeight: {
      type: String,
    },
    desiredWeight: {
      type: String,
    },
    birthday: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    sex: {
      type: String,
    },
    levelActivity: {
      type: String,
    },
  },
  { _id: false }
);

const UserData = models.userData || model('userData', userDataSchema);

export default UserData;
