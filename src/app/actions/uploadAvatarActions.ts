'use server';
import cloudinary from 'cloudinary';
import Photo from '@/src/models/userAvatarModel';
import User from '@/src/models/users';
import connectToDatabase from '@/src/utils/db';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/utils/authOptions';

connectToDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function savePhotoToLocal(file: File) {
  const data = await file.arrayBuffer();
  const base64Str = Buffer.from(data).toString('base64');

  return `data:${file.type};base64,${base64Str}`;
}

async function uploadPhotoToCloudinary(file: File) {
  const newFiles = await savePhotoToLocal(file);

  const photo = await cloudinary.v2.uploader.upload(newFiles, {
    folder: 'my_site',
  });
  if (photo?.secure_url) return photo;
}

export async function uploadPhoto(formData: FormData) {
  try {
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      throw new Error('No valid image file found.');
    }

    const photo = await uploadPhotoToCloudinary(file);

    const newPhoto = new Photo({
      public_id: photo?.public_id,
      secure_url: photo?.secure_url,
    });

    await newPhoto.save();
    const session = await getServerSession(authOption);

    const userId = session.user._id;
    const user = await User.findById(userId);

    if (user) {
      user.image = newPhoto.secure_url;

      await user.save();
      revalidatePath('/');
      return photo?.secure_url;
    } else {
      throw new Error('User not found');
    }
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    return { erMsg: error.message };
  }
}

export async function revalidate(path: string) {
  return revalidatePath(path);
}
