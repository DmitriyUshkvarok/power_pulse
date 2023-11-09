'use client';
import styles from './_navigation.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
        <Link href="/" className={styles.header_logo}>
          <Image
            src={'/logo-icon.svg'}
            alt="header logo"
            width={44}
            height={17}
          />
          <p>PowerPulse</p>
        </Link>
        <div className={styles.mobile_nav_list}>
          <div className={styles.profile_mobile_settings}>
            <Image
              src="/settings-profile.svg"
              alt="user settings icon"
              width={24}
              height={24}
            />
          </div>
          <div className={styles.profile_photo}>
            <Image
              src="/icon_user.svg"
              alt="user settings icon"
              width={24}
              height={24}
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
              src="settings-profile.svg"
              alt="user settings icon"
              width={28}
              height={28}
            />
          </Link>
          <div className={styles.profile_photo}>
            <Image
              src="/icon_user.svg"
              alt="user settings icon"
              width={24}
              height={24}
            />
          </div>
          <div className={styles.logout}>
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
