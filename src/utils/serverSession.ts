import { getServerSession } from 'next-auth';
import { authOption } from './authOptions';

export const getSessionWithAuthOptions = async () => {
  const session = await getServerSession(authOption);
  return session;
};
