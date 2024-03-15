'use server';
import connectToDatabase from '@/src/utils/db';
import Diary from '@/src/models/diaryModel';
import User from '@/src/models/users';
import { revalidatePath } from 'next/cache';

export interface CreateDiarySuccessResponse {
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

    revalidatePath('/');

    return { ...saveDiary._doc, _id: saveDiary._id.toString() };
  } catch (error) {
    console.error('An error occurred while creating product:', error);
  }
};
