'use server';
import connectToDatabase from '@/src/utils/db';
import Exercise from '@/src/models/exerciseModel';
import ExerciseCard from '@/src/models/exerciseCard.model';
import User from '@/src/models/users';
import { revalidatePath } from 'next/cache';

export interface ExerciseList {
  _id: string;
  title: string;
  imageURL: string;
  category: string;
}

export interface ExerciseData {
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
  equipment: string;
}

export interface ExerciseCardData {
  _id: string;
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
  exercisesId: string;
  equipment: string;
  video: string;
}

export const getExerciseSubCategory = async (): Promise<ExerciseList[]> => {
  connectToDatabase();
  try {
    const exercises = await Exercise.find();

    const newExercises = exercises.map((item) => ({
      ...item._doc,
      _id: item._doc._id.toString(),
    }));

    return newExercises ?? [];
  } catch (error) {
    console.error('An error occurred Exercise:', error);
    return [];
  }
};

export const createExerciseCards = async (
  data: ExerciseData,
  userId: string
) => {
  connectToDatabase();
  try {
    const newExerciseCard = new ExerciseCard({
      ...data,
      createdBy: userId,
    });

    const savedExerciseCard = await newExerciseCard.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { exerciseCards: savedExerciseCard._id },
      },
      {
        new: true,
      }
    );

    revalidatePath('/');
    return { ...savedExerciseCard._doc, _id: savedExerciseCard._id.toString() };
  } catch (error) {
    console.error('Error creating exercise cards:', error);
    throw new Error('Error creating exercise cards');
  }
};

export const getExerciseCardsByUserId = async (
  userId: string
): Promise<ExerciseCardData[]> => {
  connectToDatabase();
  try {
    const user = await User.findById(userId);

    if (!user) {
      return [];
    }

    const exerciseCardIds = user.exerciseCards;

    const exerciseCards = await ExerciseCard.find({
      _id: { $in: exerciseCardIds },
    });

    const formattedExerciseCards = exerciseCards.map((card) => ({
      ...card._doc,
      _id: card._doc._id.toString(),
    }));

    return formattedExerciseCards;
  } catch (error) {
    console.error('Произошла ошибка при получении карточек упражнений:', error);
    return [];
  }
};

export const deletedSubExerciseCard = async (cardId: string) => {
  connectToDatabase();
  try {
    const subExerciseCard = await ExerciseCard.findByIdAndDelete(cardId, {
      new: true,
    });

    revalidatePath('/');

    return { ...subExerciseCard._doc, _id: subExerciseCard._id.toString() };
  } catch (error) {
    console.error('An error occurred while fetching Exercises:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};
