'use server';
import { getServerSession } from 'next-auth';
import { authOption } from '../app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export interface RootLayoutProps {
  children: React.ReactNode;
}

const RestrictRoute = async ({ children }: RootLayoutProps) => {
  const session = await getServerSession(authOption);
  if (session) {
    redirect(`/profile`);
  }
  return <>{children}</>;
};

export default RestrictRoute;
