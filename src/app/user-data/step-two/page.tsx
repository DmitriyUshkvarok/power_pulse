import DataUserStepTwo from '@/src/Components/DataUsers/DataUserStepTwo/DataUserStepTwo';
import { getServerSession } from 'next-auth';
import { authOption } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const StepTwoPage = async () => {
  const session = await getServerSession(authOption);

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepTwo />}</>
  );
};

export default StepTwoPage;
