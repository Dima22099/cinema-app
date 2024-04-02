import { Outlet, NavLink } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import styles from './Layout.module.css';

export const Layout = () => (
    <>
      <header className={styles.navbar}>
        <NavLink to={'/'}>
          <Button>Главная</Button>
        </NavLink>

        <NavLink to={'/favorits'} >
          <Button>Избранные</Button>
        </NavLink>
      </header>

      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
