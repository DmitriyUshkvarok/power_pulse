'use server';
import connectToDatabase from '@/src/utils/db';
import Exercise from '@/src/models/exerciseModel';

export const getExerciseSubCategory = async () => {
  connectToDatabase();
  try {
    const exercises = await Exercise.find();

    const newExercises = exercises.map((item) => ({
      ...item._doc,
      _id: item._doc._id.toString(),
    }));

    console.log(newExercises);

    return { exercises: newExercises };
  } catch (error) {
    console.error('An error occurred Exercise:', error);
  }
};
