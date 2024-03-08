import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

export interface ProductDocument {
  name: string;
  calories: number;
  category: string;
  quantity: number;
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
    quantity: {
      type: Number,
      required: true,
    },
    recommended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = models.product || model('product', productSchema);

export default Product;
