'use client';
import styles from './_navigation.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Notiflix from 'notiflix';
import useIsActive from '@/src/hooks/useIsActive';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { resetUserData } from '@/src/redux/userData/userDataSlice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { setShowMobileMenu } from '@/src/redux/modalSlice/modalSlice';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';

const Navigation = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const isActive = useIsActive();
  const showMobileMenu = useAppSelector(modalsSelectors.getShowMobileMenu);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [showMobileMenu]);

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
    dispatch(setShowMobileMenu());
  };

  return (
    <>
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
            href="/exercises/body-parts"
            className={
              isActive('/exercises/body-parts')
                ? styles.activeLink
                : styles.nav_link
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
