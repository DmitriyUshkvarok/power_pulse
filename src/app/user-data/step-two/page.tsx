import DataUserStepTwo from '@/src/Components/DataUsers/DataUserStepTwo/DataUserStepTwo';
import { redirect } from 'next/navigation';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

export const metadata = {
  title: 'User Data Step Two | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const StepTwoPage = async () => {
  const session = await getSessionWithAuthOptions();

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepTwo />}</>
  );
};

export default StepTwoPage;
