import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/app/api/auth/[...nextauth]/route';
import Header from '../Components/Header/Header';
import NextAuthProvider from '../providers/NextAuthProvider';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../Components/Container/Container';
import ReduxProvider from '../providers/ReduxProvider';
import GlobalRouteTracker from '../Context/GlobalRouteTracker';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  add_diary,
  create_product,
}: {
  children: React.ReactNode;
  add_diary: React.ReactNode;
  create_product: React.ReactNode;
}) {
  const session = await getServerSession(authOption);
  return (
    <html lang="en" className={roboto.className}>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <NextAuthProvider>
            <GlobalRouteTracker>
              <ToastContainer />
              {session ? (
                <Header />
              ) : (
                <Container>
                  <div className="logo_container">
                    <Link href="/" className="header_logo">
                      <Image
                        src={'/logo-icon.svg'}
                        alt="header logo"
                        width={44}
                        height={17}
                      />
                      <p>PowerPulse</p>
                    </Link>
                  </div>
                </Container>
              )}
              <main>
                {children}
                {add_diary}
                {create_product}
              </main>
            </GlobalRouteTracker>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
