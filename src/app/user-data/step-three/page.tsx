import DataUserStepThree from '@/src/Components/DataUsers/DataUserStepThree/DataUserStepThree';
import { redirect } from 'next/navigation';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

export const metadata = {
  title: 'User Data Step Three | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

const StepThreePage = async () => {
  const session = await getSessionWithAuthOptions();

  return (
    <>
      {session?.user?.userData ? redirect('/profile') : <DataUserStepThree />}
    </>
  );
};

export default StepThreePage;
