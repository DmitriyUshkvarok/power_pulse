'use server';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import cloudinary from 'cloudinary';
import { revalidatePath } from 'next/cache';
import Photo from '@/src/models/userAvatarModel';
import User from '@/src/models/users';
import connectToDatabase from '@/src/utils/db';
import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';

connectToDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function savePhotoToLocal(file) {
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);

  const name = uuidv4();
  const ext = file.type.split('/')[1];

  const tempdir = os.tmpdir();
  const uploadDir = path.join(tempdir, `/${name}.${ext}`);
  await fs.writeFile(uploadDir, buffer);

  return { filePath: uploadDir, fileName: file.name };
}

async function uploadPhotoToCloudinary(file) {
  const { filePath } = await savePhotoToLocal(file);
  const photo = await cloudinary.v2.uploader.upload(filePath, {
    folder: 'my_site',
  });
  await fs.unlink(filePath);

  return photo;
}

export async function uploadPhoto(formData) {
  try {
    const file = formData.get('file');

    if (!file) {
      throw new Error('No valid image file found.');
    }

    const photo = await uploadPhotoToCloudinary(file);

    const newPhoto = new Photo({
      public_id: photo.public_id,
      secure_url: photo.secure_url,
    });

    await newPhoto.save();
    const session = await getServerSession(authOption);
    const userId = session?.user?._id;

    const user = await User.findById(userId);
    user.image = newPhoto.secure_url;
    await user.save();

    revalidatePath('/');

    return photo.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return { erMsg: error.message };
  }
}

export async function revalidate(path) {
  return revalidatePath(path);
}
