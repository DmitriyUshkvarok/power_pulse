import Link from 'next/link';
import './globals.scss';

export default function NotFound() {
  return (
    <div className="not_found_wrapper">
      <div className="left_block_not_found">
        <h1 className="not_found_title">404</h1>
        <p className="not_Found_description">
          Sorry, you have reached a page that we could not find. It seems that
          you are lost among the numbers and letters of our virtual space.
          Perhaps this page went on vacation or decided to disappear into
          another dimension. We apologize for this inconvenience.
        </p>
        <Link href="/" className="not_found_link_return">
          Go Home
        </Link>
      </div>
      <div className="right_block_not_found"></div>
    </div>
  );
}
