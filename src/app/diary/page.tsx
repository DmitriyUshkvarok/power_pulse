import DiaryComponent from '@/src/Components/Diary/DiaryComponent/DiaryComponent';
import Container from '@/src/Components/Container/Container';

export const metadata = {
  title: 'Diary | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const DiaryPage = () => {
  return (
    <Container>
      <h1 className="hiddenTitle">Power Pulse Dmitriy Ushkvarok Diary Page</h1>
      <DiaryComponent />
    </Container>
  );
};

export default DiaryPage;
