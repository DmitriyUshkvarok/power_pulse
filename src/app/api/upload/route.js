import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const { file } = req.body;

    const result = await cloudinary.v2.uploader.upload(file.path);

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
}
