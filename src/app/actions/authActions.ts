'use server';
import connectToDatabase from '@/src/utils/db';
import User from '@/src/models/users';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { authOption } from '../api/auth/[...nextauth]/route';
import { generateToken, veryfyToken } from '@/src/utils/token';
import { FormValues } from '@/src/Components/Auth/RegistrationForm';

connectToDatabase();

export const signUpWithCredential = async (data: FormValues) => {
  try {
    const user = await User.findOne({ email: data.email });

    if (user) throw new Error('Email already exists!');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const token = generateToken({ user: data });

    await verifyWithCredentials(token);

    return { msg: 'Registration Seccesfully!' };
  } catch (error) {
    if (error instanceof Error) {
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
      redirect(`/errors?error=${error.message}`);
    } else throw new Error('Something went wrong');
  }
}
