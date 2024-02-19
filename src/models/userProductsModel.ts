import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface ProductDocument extends Document {
  name: string;
  calories: number;
  category: string;
  quantity: number;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.product || model('product', productSchema);

export default Product;
