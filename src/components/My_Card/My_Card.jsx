import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import cn from 'classnames';

import styles from './My_Card.module.css';


export const My_Card = ({ title, poster, imdbID, isFavorite, onFavoriteToggle }) => {
    const { t } = useTranslation();

    const blurStyles = {
        background: `url(${poster})`,
        backgroundSize: 'contain',
        filter: 'blur(400px)'
    };

    return (
        <div className={styles.card} key={imdbID}>
            <div className={styles.blur_background} style={blurStyles} />

            <div className={styles.card__content}>
                <img src={poster} className={styles.card__image} alt='film poster' />

                <NavLink to={`/film/${imdbID}`} className={styles.card__title}>
                    {title}
                </NavLink>

                <div className={cn(styles.card__favorite, { [styles.card__favorite__checked]: isFavorite })} onClick={onFavoriteToggle}>
                    {isFavorite ? (
                        <>
                            <img src={'/bookmark_green.svg'} alt='icon_logo' />
                            {t("film.remove")}
                        </>
                    ) : (
                        <>
                            <img alt='like icon' src={'/like.svg'} />
                            {t("film.add_favorite")}
                        </>)
                    }


                </div>
            </div>
        </div>
    );
};
