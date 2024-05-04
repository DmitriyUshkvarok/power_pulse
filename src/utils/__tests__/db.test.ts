import connectToDatabase from '../db';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectToDatabase', () => {
  it('should successfully connect to the database with valid MONGODB_URI', async () => {
    const MONGODB_URI_TEST = process.env.MONGODB_URI;
    const mockConnect = jest
      .spyOn(mongoose, 'connect')
      .mockResolvedValueOnce({} as any);

    await connectToDatabase();
    expect(mockConnect).toHaveBeenCalledWith(MONGODB_URI_TEST);
  });

  it('should throw an error if there is an issue connecting to the database', async () => {
    const MONGODB_URI_TEST = process.env.MONGODB_URI;
    const mockConnect = jest
      .spyOn(mongoose, 'connect')
      .mockRejectedValue(new Error('Connection error'));
    await expect(connectToDatabase()).rejects.toThrow('Connection error');
    expect(mockConnect).toHaveBeenCalledWith(MONGODB_URI_TEST);
  });
});
