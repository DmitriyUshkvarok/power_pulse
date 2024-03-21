import ProductComponent from '@/src/Components/Diary/ProductComponent/ProductComponent';
import Container from '@/src/Components/Container/Container';
import { getDiaryProducts } from '../actions/diaryActions';
import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]/route';

const DiaryPage = async () => {
  const session = await getServerSession(authOption);
  const userId = session?.user?._id;

  const productDiaryData = (await getDiaryProducts(userId)) ?? [];

  return (
    <Container>
      <ProductComponent productDiaryData={productDiaryData} />
    </Container>
  );
};

export default DiaryPage;
