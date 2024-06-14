import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Translate, MoonStars, BrightnessHigh } from 'react-bootstrap-icons';

import cn from 'classnames';

import { changeTheme } from '../../store/userSlice';
import styles from './Layout.module.css';


export const Layout = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { allFavorite, theme } = useSelector(state => state.user); 
   
  const changeLanguage = (language) => i18n.changeLanguage(language);
  const getNavLinkClass = ({ isActive }) => cn(styles.link, { [styles.link__active]: isActive });
  const toggleTheme = () => {
    dispatch(changeTheme());
  }

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
                <Translate color={theme ===  'dark' ? 'white' : 'black'} size={25} /> 
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
                  onChange={toggleTheme} 
                />
              </Form>
            </div>

            <div className={styles.links}>
              <NavLink to={'/'} className={getNavLinkClass}>
                {t("layout.main")}
              </NavLink>

                <NavLink to={'/favorites'} className={getNavLinkClass}>
                  {t("layout.favorite")}
                  <span className={styles.link__count}>{Object.keys(allFavorite).length}</span>
                </NavLink>

                <NavLink to={'/SignIn'} className={getNavLinkClass}>
                  {t("layout.sign_up")}
                    <img className={styles.img__log_in} src={"/login.svg"} />
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
