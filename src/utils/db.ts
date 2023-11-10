import mongoose from 'mongoose';
const { MONGODB_URI } = process.env;

const connectToDatabase = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGO_DB is not defined in the environment variables');
    }
    await mongoose.connect(MONGODB_URI);
    console.log('Database connection successful');
  } catch (error: any) {
    console.log(error.message);
    throw new Error('error connection');
  }
};

export default connectToDatabase;
