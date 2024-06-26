'use server';
import connectToDatabase from '@/src/utils/db';
import User from '@/src/models/users';
import bcrypt from 'bcrypt';
import { generateToken, veryfyToken } from '@/src/utils/token';
import { FormValues } from '@/src/Components/Auth/RegistrationForm/types';
import { authOption } from '@/src/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import {
  OAuthSignInArgs,
  UserByEmailArgs,
  CredentialsSignInArgs,
} from './types/authActionsTypes';

export const updateUser = async (data: { image: string }) => {
  connectToDatabase();
  try {
    const session = await getServerSession(authOption);
    if (!session) throw new Error('Unauthorization');
    const userId = session?.user?._id;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { image: data.image },
      { new: true, select: '-password' }
    );

    if (!user) throw new Error('Email does not exist!');
    return { msg: 'Update Profile Seccesfully!' };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else throw new Error('Something went wrong');
  }
};

export const updateUserNameAndEmail = async (data: {
  name: string;
  email: string;
}) => {
  connectToDatabase();
  try {
    const session = await getServerSession(authOption);
    if (!session) throw new Error('Unauthorization');
    const userId = session?.user?._id;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name: data.name, email: data.email },
      { new: true, select: '-password' }
    );

    if (!user) throw new Error('Email does not exist!');

    return { msg: 'Update Profile Seccesfully!' };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else throw new Error('Something went wrong');
  }
};

export const signUpWithCredential = async (data: FormValues) => {
  connectToDatabase();
  try {
    const user = await User.findOne({ email: data.email });

    if (user) throw new Error('Email already exists!');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const token = generateToken({ user: data });

    return { token, user: data };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else throw new Error('Something went wrong');
  }
};

export async function verifyWithCredentials(token: string) {
  connectToDatabase();
  try {
    const { user } = veryfyToken(token);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) return { msg: 'verify seccess!' };

    const newUser = new User(user);
    await newUser.save();
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else throw new Error('Something went wrong');
  }
}

export async function signInWithOAuth({ account, profile }: OAuthSignInArgs) {
  connectToDatabase();
  const user = await User.findOne({ email: profile.email });
  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });

  await newUser.save();

  return true;
}

export async function getUserByEmail({ email }: UserByEmailArgs) {
  connectToDatabase();
  const user = await User.findOne({ email }).select('-passsword');

  if (!user) throw new Error('Email does not exist!');

  return { ...user._doc, _id: user._id.toString() };
}

export async function signInWithCredentials({
  email,
  password,
}: CredentialsSignInArgs) {
  connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email does not exist!');

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error('password does not match!');
  return { ...user._doc, _id: user._id.toString() };
}
