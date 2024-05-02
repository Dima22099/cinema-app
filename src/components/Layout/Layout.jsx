import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import { Translate, MoonStars, BrightnessHigh } from 'react-bootstrap-icons';

import { ThemeContext, FavoriteFilms } from '../../context';
import styles from './Layout.module.css';
import cn from 'classnames';


export const Layout = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useContext(ThemeContext);
  const { favoriteFilms } = useContext(FavoriteFilms);

  const changeLanguage = (language) => i18n.changeLanguage(language);
  const getNavLinkClass = ({ isActive }) => cn(styles.link, { [styles.link__active]: isActive });

  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <header className={styles.navbar}>
          <div className={styles.tabs}>
            <NavLink to={'/favorites'} >
                <img src={'/logo.svg'} alt='icon_logo' />
            </NavLink>
          </div>

          <div className={styles.settings}>
            <div>
              <div className={styles.settings__languages}>
                <Translate color={theme === 'dark' ? 'white' : 'black'} size={25} />
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
                  ? <MoonStars color={'white'}  size={40} className={styles.moonStars} />
                  : <BrightnessHigh size={40} className={styles.brightnessHigh} />
                }
              </div>

              <Form className={styles.switch}>
                <Form.Check
                  type="switch"
                  onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
              </Form>
            </div>

            <div className={styles.links}>
              <NavLink to={'/'} className={getNavLinkClass}>
                {t("layout.main")}
              </NavLink>

                <NavLink to={'/favorites'} className={getNavLinkClass}>
                  {t("layout.favorite")}
                  <span className={styles.link__count}>{Object.keys(favoriteFilms).length}</span>
                </NavLink>

                <NavLink to={'/Log_in'} className={getNavLinkClass}>
                  {t("layout.log_in")}
                    <img className={styles.img__log_in} src={"/Login 3.svg"} />
                </NavLink>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )};
