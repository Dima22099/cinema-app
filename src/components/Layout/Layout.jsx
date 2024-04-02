import { Outlet, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

import styles from './Layout.module.css';


export const Layout = () => {
const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }
  
  return (
    <>
      <header className={styles.navbar}>
        <NavLink to={'/'}>
          <Button>{t("layout.main")}</Button>
        </NavLink>
            
        <NavLink to={'/favorits'} >
          <Button>{t("layout.favorite")}</Button>
        </NavLink>

        <Form.Select className={styles.form} onChange={(e) => changeLanguage(e.target.value)}>
          <option value={'ru'}>
            {"RU"}
          </option>

          <option value={'en'}>
            {"EN"}
          </option>
      </Form.Select>
      </header>

      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  )};
