import DataUserStepThree from '@/src/Components/DataUsers/DataUserStepThree/DataUserStepThree';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/utils/authOptions';
import { redirect } from 'next/navigation';

const StepThreePage = async () => {
  const session = await getServerSession(authOption);

  return (
    <>
      {session?.user?.userData ? redirect('/profile') : <DataUserStepThree />}
    </>
  );
};

export default StepThreePage;
