interface RootLayoutProps {
  children: React.ReactNode;
  add_diary_exersises: React.ReactNode;
}

const ExercisesLayoutMuscles = ({
  children,
  add_diary_exersises,
}: RootLayoutProps) => {
  return (
    <section>
      <div>
        {children}
        {add_diary_exersises}
      </div>
    </section>
  );
};

export default ExercisesLayoutMuscles;
