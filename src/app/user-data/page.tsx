import DataUserStepOne from '@/src/Components/DataUsers/DataUserStepOne/DataUserStepOne';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/utils/authOptions';
import { redirect } from 'next/navigation';

const UserDataPage = async () => {
  const session = await getServerSession(authOption);

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepOne />}</>
  );
};

export default UserDataPage;
