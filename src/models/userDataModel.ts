import mongoose from 'mongoose';

const { Document, Schema, model, models } = mongoose;

export interface UserDataDocument extends Document {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  bloodGroup: string;
  sex: string;
  levelActivity: string;
}

const userDataSchema = new Schema({
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
});

const UserData = models.userData || model('userData', userDataSchema);

export default UserData;
