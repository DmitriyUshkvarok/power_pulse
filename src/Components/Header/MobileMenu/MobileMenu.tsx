'use client';
import styles from './_MobileMenu.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Notiflix from 'notiflix';

interface MobileMenuProps {
  handleClosedMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ handleClosedMobileMenu }) => {
  const pathname = usePathname();

  const handleClickLogOut = () => {
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to log out?',
      'Yes',
      'No',
      async () => {
        try {
          signOut({ callbackUrl: '/' });
        } catch (error) {
          console.log(error);
        }
      },
      () => {}
    );
  };
  return (
    <div className={styles.mobile_menu_section}>
      <div className={styles.btn_close_menu} onClick={handleClosedMobileMenu}>
        <Image
          src={'/icon-closed.svg' || 'X'}
          alt="icon button close"
          width={24}
          height={24}
        />
      </div>
      <ul className={styles.mobile_nav_list}>
        <li
          className={
            pathname === '/diary'
              ? styles.activeLink
              : styles.mobile_nav_list_item
          }
          onClick={handleClosedMobileMenu}
        >
          <Link href="/diary">Diary</Link>
        </li>
        <li
          className={
            pathname === '/products'
              ? styles.activeLink
              : styles.mobile_nav_list_item
          }
          onClick={handleClosedMobileMenu}
        >
          <Link href="/products">Products</Link>
        </li>
        <li
          className={
            pathname === '/exercises'
              ? styles.activeLink
              : styles.mobile_nav_list_item
          }
          onClick={handleClosedMobileMenu}
        >
          <Link href="/exercises">Exercises</Link>
        </li>
      </ul>
      <div className={styles.mobile_nav_logout} onClick={handleClickLogOut}>
        <span>Logout</span>
        <Image
          className={styles.mobile_nav_logout_icon}
          src="/log-out-01.svg"
          alt="icon button log out"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
