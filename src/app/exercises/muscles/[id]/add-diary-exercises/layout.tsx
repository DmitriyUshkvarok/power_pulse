interface RootLayoutProps {
  children: React.ReactNode;
}

const ExercisesLayoutWellDone = ({ children }: RootLayoutProps) => {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
};

export default ExercisesLayoutWellDone;
