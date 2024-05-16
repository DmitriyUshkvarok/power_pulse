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
    template: `%s | My Site Power Pulse | Dmitriy Ushkvarok`,
  },
  description:
    'Power Pulse is your ultimate fitness companion, designed for both trainers and enthusiasts alike. Seamlessly integrated with calorie tracking, it helps you achieve your fitness goals by accurately monitoring your daily calorie intake and expenditure. Whether youre aiming to lose weight, build muscle, or maintain a healthy lifestyle, Power Pulse provides comprehensive insights tailored to your needs.With Power Pulse, you can effortlessly track your daily calorie consumption based on your individual requirements. Simply input your daily calorie goal, and the app will guide you through every meal and snack, ensuring you stay on track towards your target. Moreover, its intuitive interface makes logging workouts a breeze, allowing you to record each session and the calories burned in real-time.Stay motivated and accountable by logging your daily workouts and monitoring your progress over time. Whether youre hitting the gym, going for a run, or practicing yoga, Power Pulse ensures that every calorie burned counts towards your fitness journey.Take charge of your fitness and nutrition with Power Pulse today. Transform your lifestyle, reach your fitness milestones, and unleash your full potential with the ultimate workout and diet management app.',
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
