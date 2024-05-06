import mongoose from 'mongoose';
const { MONGODB_URI } = process.env;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('Database connection successful');
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export default connectToDatabase;
