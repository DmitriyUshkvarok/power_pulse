export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile',
    '/user-data/:path*',
    '/diary',
    '/products',
    '/create-product',
    '/add-diary',
    '/exercises/:path*',
  ],
};
