import DataUserStepOne from '@/src/Components/DataUsers/DataUserStepOne/DataUserStepOne';
import { redirect } from 'next/navigation';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

const UserDataPage = async () => {
  const session = await getSessionWithAuthOptions();

  return (
    <>{session?.user?.userData ? redirect('/profile') : <DataUserStepOne />}</>
  );
};

export default UserDataPage;
