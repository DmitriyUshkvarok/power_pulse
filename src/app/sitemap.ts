import Product from '../models/userProductsModel';
import connectToDatabase from '../utils/db';

export default async function sitemap() {
  await connectToDatabase();
  const baseUrl = 'https://power-pulse-umber.vercel.app';
  const products = await Product.find({});

  const productsUrl = products?.map((product) => {
    return {
      url: `${baseUrl}/products/${product._id}`,
      lastModified: product.updatedAt,
    };
  });
  return [
    {
      url: `${baseUrl}/diary`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/exercises/body-parts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/exercises/muscles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/exercises/equipment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...productsUrl,
  ];
}
