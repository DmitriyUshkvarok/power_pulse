import DataUserStepTwo from '@/src/Components/DataUsers/DataUserStepTwo/DataUserStepTwo';
import { redirect } from 'next/navigation';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

const StepTwoPage = async () => {
  const session = await getSessionWithAuthOptions();

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepTwo />}</>
  );
};

export default StepTwoPage;
