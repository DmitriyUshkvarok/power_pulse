import Container from '../Container/Container';
import styles from './_header.module.scss';
import Navigation from './Navigation/Navigation';
import { getServerSession } from 'next-auth';

const Header = async () => {
  const session = await getServerSession();
  const borderBottomStyle = session
    ? { borderBottom: '1px solid rgba(239, 237, 232, 0.20)' }
    : {};
  return (
    <header className={styles.header} style={borderBottomStyle}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
