'use client';
import styles from './_exercises_component_wrapper.module.scss';
import ExercisesList from '../ExercisesList/ExercisesList';
import Pagination from '../../UI/Pagination/Pagination';
import useFilteredExercises from '@/src/hooks/useFilteredExercises';
import useTabletItemsPerPage from '@/src/hooks/useTabletItemsPerPage';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { setCurrentPage } from '@/src/redux/paginationSlice/paginationSlice';

const ExercisesComponent = () => {
  const dispatch = useAppDispatch();
  const exercisesToShow = useFilteredExercises();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const exerciseStatus = useAppSelector((state) => state.exercises.status);

  const totalItems = exercisesToShow.length;
  const itemsPerPage = useTabletItemsPerPage();

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      {exerciseStatus === 'loading' ? (
        <div style={{ textAlign: 'center', color: 'white' }}>Loading...</div>
      ) : (
        <div className={styles.exercises_component_container}>
          <ExercisesList />
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ExercisesComponent;
