'use client';
import styles from './_navigation.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Notiflix from 'notiflix';
import { useSession } from 'next-auth/react';
import { resetUserData } from '@/src/redux/userData/userDataSlice';
import { useDispatch } from 'react-redux';

const Navigation = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClickLogOut = () => {
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to log out?',
      'Yes',
      'No',
      async () => {
        try {
          dispatch(resetUserData());
          signOut({ callbackUrl: '/' });
        } catch (error) {
          console.error(error);
        }
      },
      () => {}
    );
  };

  const handleOpenMobileMenu = () => {
    setShowMobileMenu(true);
  };

  const handleClosedMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      {showMobileMenu && (
        <MobileMenu handleClosedMobileMenu={handleClosedMobileMenu} />
      )}
      <div className={styles.nav_wrapper}>
        <Link href={session ? '/diary' : '/'} className={styles.header_logo}>
          <Image
            src={'/logo-icon.svg'}
            alt="header logo"
            width={44}
            height={17}
          />
          <p>PowerPulse</p>
        </Link>
        <div className={styles.mobile_nav_list}>
          <Link href="/profile" className={styles.profile_mobile_settings}>
            <Image
              src="/settings-profile.svg"
              alt="user settings icon"
              width={24}
              height={24}
            />
          </Link>
          <div className={styles.profile_photo}>
            <Image
              src={session?.user?.image || '/icon_user.svg'}
              alt="user settings icon"
              width={24}
              height={24}
              className={styles.profile_image}
            />
          </div>
          <div
            className={styles.profile_mobile_burger}
            onClick={handleOpenMobileMenu}
          >
            <Image
              src="/burger.svg"
              alt="birger menu icon"
              width={24}
              height={24}
            />
          </div>
        </div>
        <nav className={styles.nav_list} style={{ color: 'white' }}>
          <Link
            href="/diary"
            className={
              pathname === '/diary' ? styles.activeLink : styles.nav_link
            }
          >
            Diary
          </Link>
          <Link
            href="/products"
            className={
              pathname === '/products' ? styles.activeLink : styles.nav_link
            }
          >
            Products
          </Link>
          <Link
            href="/exercises"
            className={
              pathname === '/exercises' ? styles.activeLink : styles.nav_link
            }
          >
            Exercises
          </Link>
          <Link
            href="/profile"
            className={
              pathname === '/profile'
                ? styles.activeLinkProfilePath
                : styles.activeLinkProfile
            }
          >
            <Image
              src="/settings-profile.svg"
              alt="user settings icon"
              width={28}
              height={28}
            />
          </Link>
          <div className={styles.profile_photo}>
            <Image
              src={session?.user?.image || '/icon_user.svg'}
              alt="user settings icon"
              width={24}
              height={24}
              className={styles.profile_image}
            />
          </div>
          <div
            className={styles.logout}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              handleClickLogOut()
            }
          >
            <Image
              src="/log-out.svg"
              alt="log out icon"
              width={20}
              height={20}
            />
            Logout
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
