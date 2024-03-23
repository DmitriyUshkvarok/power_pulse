'use server';
import connectToDatabase from '@/src/utils/db';
import Diary from '@/src/models/diaryModel';
import User from '@/src/models/users';
import { revalidatePath } from 'next/cache';

export interface CreateDiarySuccessResponse {
  _id: string;
  title: string;
  category: string;
  calories: string;
  weight: string;
  recommended: boolean | undefined;
  date: string;
}

export const createDiary = async (
  diaryData: CreateDiarySuccessResponse,
  userId: string
) => {
  connectToDatabase();
  try {
    const newDiary = new Diary({ ...diaryData, createdBy: userId });

    const saveDiary = await newDiary.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { diarys: saveDiary._id },
      },
      {
        new: true,
      }
    );

    return { ...saveDiary._doc, _id: saveDiary._id.toString() };
  } catch (error) {
    console.error('An error occurred while creating product:', error);
  }
};

export const getDiaryProducts = async (userId: string) => {
  connectToDatabase();
  try {
    const user = await User.findById(userId);

    const productDiaryIds = user.diarys;

    const diaryProducts = await Diary.find({ _id: { $in: productDiaryIds } });

    const newDiaryProducts = diaryProducts.map((item) => ({
      ...item._doc,
      _id: item._doc._id.toString(),
    }));

    return newDiaryProducts || [];
  } catch (error) {
    console.error('An error occurred while creating product:', error);
  }
};

export const deletedDiaryProduct = async (productId: string) => {
  connectToDatabase();
  try {
    const productDiary = await Diary.findByIdAndDelete(productId, {
      new: true,
    });

    revalidatePath('/');

    return { ...productDiary._doc, _id: productDiary._id.toString() };
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};
