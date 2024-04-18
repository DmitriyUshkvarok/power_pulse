'use client';
import styles from './_data_user_navigation_list.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DataUserNavigationList = () => {
  const pathname = usePathname();

  const links = [
    { href: '/user-data' },
    { href: '/user-data/step-two' },
    { href: '/user-data/step-three' },
  ];

  const getActiveClass = (href: string) => {
    const hrefIndex = links.findIndex((link) => link.href === href);
    const currentHrefIndex = links.findIndex((link) => link.href === pathname);

    if (hrefIndex !== -1 && currentHrefIndex >= hrefIndex) {
      return styles.active_link;
    }
    return styles.nav_pagination_link;
  };

  return (
    <div className={styles.nav_pagination}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={getActiveClass(link?.href)}
        ></Link>
      ))}
    </div>
  );
};

export default DataUserNavigationList;
