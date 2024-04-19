import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import { Translate, MoonStars, BrightnessHigh } from 'react-bootstrap-icons';

import { ThemeContext, FavoritFilms } from '../../context';
import styles from './Layout.module.css';


export const Layout = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const { favoritFilms } = useContext(FavoritFilms);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }
  // console.log('favoritFilms', favoritFilms);
  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <header className={styles.navbar}>
          <div className={styles.tabs}>
            <NavLink to={'/favorits'} >
                <img className={styles.icon_logo} src={'/logo.svg'} alt='icon_logo' />
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
            <div className={styles.favorits}>
              <NavLink to={'/'}>
                {t("layout.main")}
              </NavLink>
              <div className={styles.favorits__count}>
                <NavLink to={'/favorits'} >
                  {t("layout.favorite")}
                  <span> - </span>
                  {<span className={styles.favorits_count__number}>{ Object.keys(favoritFilms).length}</span>}
                </NavLink>
              </div>
              <div className={styles.log_in}>
                <NavLink to={'/Log_in'}>  
                  {t("layout.log_in")}
                    <img className={styles.img__log_in} src={"/Login 3.svg"} />
                </NavLink>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )};
