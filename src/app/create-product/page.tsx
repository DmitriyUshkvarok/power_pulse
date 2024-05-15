import ProductForm from '@/src/Components/Modals/ProductFormModal/ProductForm';

export const metadata = {
  title: 'Create Product | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const CreateProductPage = () => {
  return <ProductForm />;
};

export default CreateProductPage;
