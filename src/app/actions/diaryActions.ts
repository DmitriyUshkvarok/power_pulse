'use server';
import connectToDatabase from '@/src/utils/db';
import Diary from '@/src/models/diaryModel';
import User from '@/src/models/users';
import DiaryExercises from '@/src/models/diaryExercisesModel';
import { revalidatePath } from 'next/cache';
import {
  CreateDiarySuccessResponse,
  CreateDiaryExercisesResponse,
  DiaryProduct,
  getDiaryExercisesResponse,
} from './types/diaryActionsTypes';

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

export const createDiaryExercises = async (
  data: CreateDiaryExercisesResponse,
  userId: string
) => {
  connectToDatabase();
  try {
    const newDiatyExercises = new DiaryExercises({
      ...data,
      createdBy: userId,
    });

    const saveDiaryExercises = await newDiatyExercises.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { diaryExercises: saveDiaryExercises._id },
      },
      {
        new: true,
      }
    );

    revalidatePath('/');
    return {
      ...saveDiaryExercises._doc,
      _id: saveDiaryExercises._id.toString(),
    };
  } catch (error) {
    console.error('An error occurred while creating exercises diart:', error);
  }
};

export const getDiaryProducts = async (
  userId: string
): Promise<DiaryProduct[]> => {
  connectToDatabase();
  try {
    const user = await User.findById(userId);

    if (!user) {
      return [];
    }

    const productDiaryIds = user.diarys;

    const diaryProducts = await Diary.find({ _id: { $in: productDiaryIds } });

    const newDiaryProducts = diaryProducts.map((item) => ({
      ...item._doc,
      _id: item._doc._id.toString(),
    }));

    return newDiaryProducts;
  } catch (error) {
    console.error('An error occurred while creating product:', error);
    throw new Error('Internal Server Error');
  }
};

export const getDiaryExercises = async (
  userId: string
): Promise<getDiaryExercisesResponse[]> => {
  connectToDatabase();
  try {
    const user = await User.findById(userId);

    if (!user) {
      return [];
    }

    const exercisestDiaryIds = user.diaryExercises;

    const diaryExercises = await DiaryExercises.find({
      _id: { $in: exercisestDiaryIds },
    });

    const newDiaryExercises = diaryExercises.map((item) => ({
      ...item._doc,
      _id: item._doc._id.toString(),
    }));

    return newDiaryExercises;
  } catch (error) {
    console.error('An error occurred while get exercises diary:', error);
    throw new Error('Internal Server Error');
  }
};

export const deletedDiaryProduct = async (productId: string) => {
  connectToDatabase();
  try {
    const productDiary = await Diary.findByIdAndDelete(productId, {
      new: true,
    });

    return { ...productDiary._doc, _id: productDiary._id.toString() };
  } catch (error) {
    console.error('An error occurred while deleting products:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};

export const deletedDiaryExercises = async (productId: string) => {
  connectToDatabase();
  try {
    const exercisesDiary = await DiaryExercises.findByIdAndDelete(productId, {
      new: true,
    });

    revalidatePath('/');

    return { ...exercisesDiary._doc, _id: exercisesDiary._id.toString() };
  } catch (error) {
    console.error('An error occurred while deleting diary exercises:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};
