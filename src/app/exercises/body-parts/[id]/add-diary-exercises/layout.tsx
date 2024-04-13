interface RootLayoutProps {
  children: React.ReactNode;
  // add_diary_exersises: React.ReactNode;
  // well_done_exercises: React.ReactNode;
}

const ExercisesLayoutWellDone = ({
  children,
}: // add_diary_exersises,
// well_done_exercises,
RootLayoutProps) => {
  return (
    <section>
      <div>
        {children}
        {/* {add_diary_exersises} */}
        {/* {well_done_exercises} */}
      </div>
    </section>
  );
};

export default ExercisesLayoutWellDone;
