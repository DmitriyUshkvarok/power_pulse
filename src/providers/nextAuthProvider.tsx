'use client';
import { SessionProvider } from 'next-auth/react';

export interface RootLayoutProps {
  children: React.ReactNode;
}

const NextAuthProvider = ({ children }: RootLayoutProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
