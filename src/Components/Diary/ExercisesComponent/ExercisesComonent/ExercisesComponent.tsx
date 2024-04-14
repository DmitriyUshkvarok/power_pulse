import { getServerSession } from 'next-auth';
import ExercisesDiaryList from '../ExercisesDiaryList';
import { getDiaryExercises } from '@/src/app/actions/diaryActions';
import { authOption } from '@/src/app/api/auth/[...nextauth]/route';

const ExercisesComponent = async () => {
  const session = await getServerSession(authOption);

  const userId = session?.user?._id;
  const exercisesDiaryData = await getDiaryExercises(userId);

  return <ExercisesDiaryList exercisesDiaryData={exercisesDiaryData} />;
};

export default ExercisesComponent;
