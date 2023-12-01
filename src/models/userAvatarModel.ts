import { Schema, models, model } from 'mongoose';

const photoSchema = new Schema(
  {
    public_id: String,
    secure_url: String,
  },
  { timestamps: true }
);
const Photo = models.photos || model('photos', photoSchema);

export default Photo;
