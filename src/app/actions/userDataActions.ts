'use server';
import connectToDatabase from '@/src/utils/db';
import UserData, { UserDataDocument } from '@/src/models/userDataModel';
import User from '@/src/models/users';
import { revalidatePath } from 'next/cache';

connectToDatabase();

export const createDataUser = async (
  data: UserDataDocument,
  userId: string
) => {
  try {
    const newUserData = new UserData(data);
    await newUserData.save();

    if (!newUserData._id) {
      throw new Error('Failed to save user data');
    }

    await User.findByIdAndUpdate(userId, { userData: newUserData._id });

    return { ...newUserData._doc, _id: newUserData._id.toString() };
  } catch (error) {
    console.error('An error occurred while creating data:', error);
    return { error: 'Internal Server Error', statusCode: 500 };
  }
};

export const getUserDataById = async (userDataId: string) => {
  try {
    const userData = await UserData.findOne({ _id: userDataId });

    const newUserData = {
      ...userData._doc,
      _id: userData._doc._id.toString(),
    };

    return { userData: newUserData };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`/errors?error=${error.message}`);
    } else throw new Error('Something went wrong');
  }
};

export async function updateUserData(id: string, data: {}) {
  try {
    const userData = await UserData.findByIdAndUpdate(id, data, {
      new: true,
    });

    revalidatePath('/');

    return { ...userData._doc, _id: userData._id.toString() };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`/errors?error=${error.message}`);
    } else throw new Error('Something went wrong');
  }
}
