'use client';
import Container from '../Container/Container';
import styles from './_header.module.scss';
import Navigation from './Navigation/Navigation';
import MobileMenu from './MobileMenu/MobileMenu';
import { useAppSelector } from '@/src/hooks/redux-hook';
import { useSession } from 'next-auth/react';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';

const Header = () => {
  const { data: session } = useSession();

  const showMobileMenu = useAppSelector(modalsSelectors.getShowMobileMenu);

  const borderBottomStyle = session
    ? { borderBottom: '1px solid rgba(239, 237, 232, 0.20)' }
    : {};

  return (
    <header className={styles.header} style={borderBottomStyle}>
      <Container>
        <Navigation />
      </Container>
      <>{showMobileMenu && <MobileMenu />}</>
    </header>
  );
};

export default Header;
