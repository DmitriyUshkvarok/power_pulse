'use server';
import connectToDatabase from '@/src/utils/db';
import Exercise from '@/src/models/exerciseModel';

interface ExerciseList {
  _id: string;
  title: string;
  imageURL: string;
  category: string;
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
