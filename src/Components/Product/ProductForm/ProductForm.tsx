'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { createProduct } from '@/src/app/actions/productActions';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    calories: 0,
    category: '',
    quantity: 0,
  });

  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProduct(formData, userId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Calories:
        <input
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
