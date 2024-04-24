import DataUserStepThree from '@/src/Components/DataUsers/DataUserStepThree/DataUserStepThree';
import { redirect } from 'next/navigation';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

const StepThreePage = async () => {
  const session = await getSessionWithAuthOptions();

  return (
    <>
      {session?.user?.userData ? redirect('/profile') : <DataUserStepThree />}
    </>
  );
};

export default StepThreePage;
