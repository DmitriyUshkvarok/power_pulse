import styles from './_diary_component.module.scss';
import DaySwitch from '../../UI/DaySwitch/DaySwitch';
import ProductComponent from '../ProductComponent/ProductComponent';
import DayDashboard from '../DayDashboard/DayDashboard';
import ExercisesComponent from '../ExercisesComponent/ExercisesComonent/ExercisesComponent';

const DiaryComponent = () => {
  return (
    <section className={styles.diary_page_section}>
      <div className={styles.diary_page_title_switch_wrapper}>
        <h1 className={styles.diary_page_title}>Diary</h1>
        <DaySwitch />
      </div>
      <div className={styles.diary_page_wrapper}>
        <div className={styles.dashboard_box_wrapper}>
          <DayDashboard />
        </div>
        <div className={styles.product_box_wrapper}>
          <div>
            <ProductComponent />
          </div>
          <div>
            <ExercisesComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiaryComponent;
