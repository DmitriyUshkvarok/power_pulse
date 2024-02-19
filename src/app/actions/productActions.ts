'use server';
import connectToDatabase from '@/src/utils/db';
import Product, { ProductDocument } from '@/src/models/userProductsModel';
import User from '@/src/models/users';
import { revalidatePath } from 'next/cache';

export interface ProductFormData {
  name: string;
  calories: number;
  category: string;
  quantity: number;
}

connectToDatabase();

export const createProduct = async (
  productData: ProductFormData,
  userId: string
) => {
  try {
    const newProduct = new Product({ ...productData, createdBy: userId });
    const savedProduct = await newProduct.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { products: savedProduct._id },
      },
      {
        new: true,
      }
    );

    revalidatePath('/');

    return { ...savedProduct._doc, _id: savedProduct._id.toString() };
  } catch (error) {
    console.error('An error occurred while creating product:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};

export const getProductsByUserId = async (userId: string): Promise<any> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { error: 'User not found', statusCode: 404 };
    }

    const productIds = user.products;

    const products = await Product.find({ _id: { $in: productIds } });

    const productData = products.map((product) => ({
      ...product._doc,
      _id: product._id.toString(),
    }));

    return productData;
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};
