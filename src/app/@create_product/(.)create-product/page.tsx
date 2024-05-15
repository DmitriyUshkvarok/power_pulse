import CreateProductPage from '../../create-product/page';

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
const CreateProductPageParallel = () => {
  return <CreateProductPage />;
};

export default CreateProductPageParallel;
