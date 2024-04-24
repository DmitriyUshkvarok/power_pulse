import { useSession } from 'next-auth/react';
import { UserSession } from '../Components/DataUsers/DataUserStepThree/types';

const useUserSession = () => {
  const { data: session, update } = useSession();
  const userId = (session?.user as UserSession)?._id;
  const userDataId = (session?.user as UserSession)?.userData;

  return {
    session,
    userId,
    userDataId,
    update,
  };
};

export default useUserSession;
