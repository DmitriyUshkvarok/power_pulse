'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const Errors = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get('error');
  return (
    <div style={{ marginTop: '90px' }}>
      <h1 style={{ color: 'red' }}>Errors:{errorMsg}</h1>
      <button onClick={() => router.back()}>Try Again</button>
    </div>
  );
};

export default Errors;
