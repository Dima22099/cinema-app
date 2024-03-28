import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export const Layout = () => (
    <>
      <header className={styles.navbar}>
        <h1>Поиск фильмов по названию.</h1>
      </header>

      <div className={styles.content}>
        <Outlet />
      </div>
    </>
);

