import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithOAuth } from '@/src/app/actions/authActions';
import { getUserByEmail } from '@/src/app/actions/authActions';
import { signInWithCredentials } from '@/src/app/actions/authActions';

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          required: true,
        },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await signInWithCredentials({ email, password });
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/errors',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type === 'oauth') {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },

    async jwt({ token, trigger, session }) {
      if (trigger === 'update') {
        token.user.name = session.name;
        token.user.image = session.image;
      } else {
        const user = await getUserByEmail({ email: token.email });
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
