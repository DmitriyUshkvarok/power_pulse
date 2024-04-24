import ExercisesDiaryList from '../ExercisesDiaryList/ExercisesDiaryList';
import { getDiaryExercises } from '@/src/app/actions/diaryActions';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

const ExercisesComponent = async () => {
  const session = await getSessionWithAuthOptions();

  const userId = session?.user?._id;
  const exercisesDiaryData = await getDiaryExercises(userId);

  return <ExercisesDiaryList exercisesDiaryData={exercisesDiaryData} />;
};

export default ExercisesComponent;
