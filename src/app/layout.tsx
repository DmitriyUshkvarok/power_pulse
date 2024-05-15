import './globals.scss';
import { Roboto } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/utils/authOptions';
import Header from '../Components/Header/Header';
import NextAuthProvider from '../providers/nextAuthProvider';
import ReduxProvider from '../providers/reduxProvider';
import GlobalRouteTracker from '../Context/GlobalRouteTracker';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../Components/Container/Container';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  metadataBase: new URL('https://power-pulse-umber.vercel.app'),
  title: {
    default: 'Power Pulse | Dmitriy Ushkvarok',
    template: `%s | My Site Power Pulse| Dmitriy Ushkvarok`,
  },
  description: 'App for exercises',
  generator: 'Next.js',
  applicationName: 'My App Power Pulse Dmitriy Ushkvarok',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
    'Redux',
    'Jest',
    'Dmitriy Ushkvarok',
    'Exercises App',
    'fullstack app on Next js',
    'server action',
  ],
  authors: [
    {
      name: 'Dmitriy Ushkvarok',
      url: 'https://www.dmitriy-ushkvarok.website/',
    },
  ],
  creator: 'Dmitriy Ushkvarok',
  publisher: 'Dmitriy Ushkvarok',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'My Site Power Pulse | Dmitriy Ushkvarok',
    description: 'Welcome to my site Power Pulse App',
    images: [
      {
        url: '/openGraphImg.png',
        width: 400,
        height: 300,
      },
    ],
    type: 'website',
    siteName: 'Dmitriy Ushkvarok My Site Power Pulse',
  },
  verification: {
    google: 'AOjUnX-0ZVriCXmOY7_0Qkj2Me_F9HO3-IoLSjmde44',
  },
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
      <link rel="apple-touch-icon" href="/logo-for-mobile.png"></link>
      <link rel="manifest" href="/manifest.json"></link>
      <body suppressHydrationWarning={true}>
        <h1 className="hiddenTitle">Power Pulse Dmitriy Ushkvarok Home Page</h1>
        <ReduxProvider>
          <NextAuthProvider>
            <GlobalRouteTracker>
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
