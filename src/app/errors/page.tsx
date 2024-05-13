'use client';
import '../globals.scss';
import { useRouter, useSearchParams } from 'next/navigation';

const Errors = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get('error');
  return (
    <div className="not_found_wrapper">
      <div className="left_block_not_found">
        <p
          style={{ color: 'white', fontSize: '21px' }}
          className="not_found_title"
        >
          Errors:{errorMsg}
        </p>
        <button
          style={{ color: 'black' }}
          className="not_found_link_return"
          onClick={() => router.back()}
        >
          Try Again
        </button>
      </div>
      <div className="right_block_not_found"></div>
    </div>
  );
};

export default Errors;
