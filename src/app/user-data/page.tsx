import DataUserStepOne from '@/src/Components/DataUsers/DataUserStepOne/DataUserStepOne';
import { redirect } from 'next/navigation';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

export const metadata = {
  title: 'User Data Step One | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const UserDataPage = async () => {
  const session = await getSessionWithAuthOptions();

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepOne />}</>
  );
};

export default UserDataPage;
