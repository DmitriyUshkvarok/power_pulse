import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface ProductDocument {
  name: string;
  calories: number;
  category: string;
  weight: number;
  recommended: boolean;
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
    weight: {
      type: Number,
      required: true,
    },
    recommended: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = models.product || model('product', productSchema);

export default Product;
