import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Translate, MoonStars, BrightnessHigh } from 'react-bootstrap-icons';

import { ThemeContext } from '../../context';
import styles from './Layout.module.css';


export const Layout = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }
  
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.tabs}>
          <NavLink to={'/'}>
              {t("layout.main")}
          </NavLink>
          <NavLink to={'/favorits'} >
              {t("layout.favorite")}
          </NavLink>
        </div>

        <div className={styles.settings}>
          <div>
            <div className={styles.settings__languages}>
              <Translate size={25} />
              {' '}
              <span>{t("layout.language")}</span>
            </div>

            <Form.Select className={styles.form} onChange={(e) => changeLanguage(e.target.value)}>
              <option value={'ru'}>
                {"🇷🇺 RU"}
              </option>

              <option value={'en'}>
                {"🏴󠁧󠁢󠁥󠁮󠁧󠁿 EN"}
              </option>
            </Form.Select>
          </div>
          
          <div className={styles.theme_toggler}>
            <div className={styles.theme_toggler__icon}>
              {theme === 'dark' 
                ? <MoonStars size={40} />
                : <BrightnessHigh size={40} />
              }
            </div>
    
            <Form className={styles.switch}>
              <Form.Check
                type="switch"
                onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
            </Form>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  )};
