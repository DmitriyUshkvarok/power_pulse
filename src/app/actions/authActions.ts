'use server';
import connectToDatabase from '@/src/utils/db';
import User from '@/src/models/users';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { generateToken, veryfyToken } from '@/src/utils/token';
import { FormValues } from '@/src/Components/Auth/RegistrationForm';
import { authOption } from '@/src/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

connectToDatabase();

export const updateUser = async (data: { image: string }) => {
  try {
    const session = await getServerSession(authOption);
    if (!session) throw new Error('Unauthorization');
    const user = await User.findByIdAndUpdate(
      session?.user?._id,
      { image: data.image },
      {
        new: true,
      }
    ).select('-password');
    if (!user) throw new Error('Email does not exist!');
    return { msg: 'Update Profile Seccesfully!' };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка во время регистрации:', error);
      redirect(`/errors?error=${error.message}`);
    } else {
      redirect(`/errors?error=Unknown error`);
    }
  }
};

export const signUpWithCredential = async (data: FormValues) => {
  try {
    const user = await User.findOne({ email: data.email });

    if (user) throw new Error('Email already exists!');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const token = generateToken({ user: data });

    return { token, user: data };
    // return { msg: 'Registration Seccesfully!' };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка во время регистрации:', error);
      redirect(`/errors?error=${error.message}`);
    } else throw new Error('Something went wrong');
  }
};

export async function verifyWithCredentials(token: string) {
  try {
    const { user } = veryfyToken(token);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) return { msg: 'verify seccess!' };

    const newUser = new User(user);
    await newUser.save();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка во время регистрации:', error);
      redirect(`/errors?error=${error.message}`);
    } else throw new Error('Something went wrong');
  }
}
