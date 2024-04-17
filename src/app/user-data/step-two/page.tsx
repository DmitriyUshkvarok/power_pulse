import DataUserStepTwo from '@/src/Components/DataUsers/DataUserStepTwo/DataUserStepTwo';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/utils/authOptions';
import { redirect } from 'next/navigation';

const StepTwoPage = async () => {
  const session = await getServerSession(authOption);

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepTwo />}</>
  );
};

export default StepTwoPage;
