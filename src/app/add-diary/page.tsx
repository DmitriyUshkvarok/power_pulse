import AddDiaryModal from '@/src/Components/Modals/AddDiaryModal/AddDiaryModal';

export const metadata = {
  title: 'Add Diary | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const AddDiaryPage = () => {
  return <AddDiaryModal />;
};

export default AddDiaryPage;
