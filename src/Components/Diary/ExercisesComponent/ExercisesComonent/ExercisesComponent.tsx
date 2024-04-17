import { getServerSession } from 'next-auth';
import ExercisesDiaryList from '../ExercisesDiaryList/ExercisesDiaryList';
import { getDiaryExercises } from '@/src/app/actions/diaryActions';
import { authOption } from '@/src/utils/authOptions';

const ExercisesComponent = async () => {
  const session = await getServerSession(authOption);

  const userId = session?.user?._id;
  const exercisesDiaryData = await getDiaryExercises(userId);

  return <ExercisesDiaryList exercisesDiaryData={exercisesDiaryData} />;
};

export default ExercisesComponent;
