'use server';
import connectToDatabase from '@/src/utils/db';
import Exercise from '@/src/models/exerciseModel';
import ExerciseCard from '@/src/models/exerciseCard.model';
import User from '@/src/models/users';

interface ExerciseList {
  _id: string;
  title: string;
  imageURL: string;
  category: string;
}

interface ExerciseData {
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
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
  userId: string,
  exerciseId: string | number
) => {
  connectToDatabase();
  try {
    const { name, burnedCalories, bodyPart, target } = data;

    const newExerciseCard = new ExerciseCard({
      exercise: exerciseId,
      name,
      burnedCalories,
      bodyPart,
      target,
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

    return savedExerciseCard;
  } catch (error) {
    console.error('Error creating exercise cards:', error);
    throw new Error('Error creating exercise cards');
  }
};
