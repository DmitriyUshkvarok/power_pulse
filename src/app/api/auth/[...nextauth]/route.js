import NextAuth from 'next-auth/next';
import { authOption } from '@/src/utils/authOptions';
import connectToDatabase from '@/src/utils/db';

connectToDatabase();

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
