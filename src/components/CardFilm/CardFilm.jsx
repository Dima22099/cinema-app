import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import cn from 'classnames';

import styles from './CardFilm.module.css';


export const CardFilm = ({ title,  poster, id, rating, releaseDate, isFavorite, onFavoriteToggle, isLinkEnabled }) => {
    const { t } = useTranslation();

    const blurStyles = {
        background: `url(${poster})`,
        backgroundSize: 'contain',
        filter: 'blur(60px)'
    };
    const placeholderImage = '/noImage.svg'; 
    const isPoster = poster.endsWith('jpg') || poster.endsWith('JPEG');
    
    return (
        <div className={styles.card} key={id}>
            <div className={styles.blur_background} style={blurStyles} />
            <div className={styles.card__content}>
                <img src={isPoster ? poster : placeholderImage} className={styles.card__image} alt={t("Card.noPoster")} />
                {isLinkEnabled ? (
                    <NavLink to={`/film/${id}`} className={styles.card__title}>
                        <span>{`${t("film.year")}: ${releaseDate}`}</span>
                        <span>{`${t("card.rating")}: ${rating}`}</span>
                        {title}
                    </NavLink>
                ) : (
                    <div className={styles.card__title}>
                        <span>{`${t("film.year")}: ${releaseDate}`}</span>
                        <span>{`${t("card.rating")}: ${rating}`}</span>
                        {title}
                    </div>
                )}

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
