import { useCallback, useContext, useEffect, useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Loader, CardFilm } from '../../components';
import { Api } from '../../api';
import { FavoriteFilms } from '../../context';

import styles from './Film.module.css';


export const Film = () => {
    const { t } = useTranslation();
    const { favoriteFilms, toggleFavorites } = useContext(FavoriteFilms);

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData] = useState(null);
    const [hasError, setHasError] = useState(false);

    const getFilm = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await Api.getFilmData(id);
            setFilmData(data);
        } catch (e) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getFilm();
    }, []);

    if (isLoading) {
        return (
            <div className={styles.spinner}>
                <Loader variant="primary" size={'s'}/>
            </div>
        )
    }

    if (!filmData) {
        return <h1 className={styles.loader}>{t("loader")}...</h1>
    }

    if (hasError) {
        return <h1 className={styles.loader}>{t("has_error")} ...</h1>
    }
    const isFavorite = Boolean(favoriteFilms[id]);
    const releaseDate = new Date(filmData.release_date).toLocaleDateString("ru");
    const rating = filmData.vote_average.toFixed(1);
    return (
        <>
            <div className={styles.link__wrapper}>
                <NavLink to={'/'} className={styles.link}>
                    <ArrowLeft size={40} />
                    <span>{t("film.to_main")}</span>
                </NavLink>
            </div>
            <div className={styles.poster__wrapper}>
                <CardFilm
                    key={filmData.id} 
                    isLinkEnabled={false}
                    releaseDate={releaseDate}
                    rating={rating}
                    title={filmData.title}
                    poster={Api.getPosterURL(filmData.poster_path)}
                    isFavorite={isFavorite}
                    onFavoriteToggle={() => toggleFavorites(filmData.id)}
                    className={cn(styles.card__favorite, { [styles.card__favorite__checked]: isFavorite })}
                    />
                <div className={styles.film}>
                    <p className={styles.film__detail}>
                        {filmData.title && <span>{t("film.title")}: {filmData.title}</span>}
                        {releaseDate && <span>{t("film.year")}: {releaseDate}</span>}
                        {filmData.production_countries && <span>{t("film.origin_country")}: {filmData.production_countries.map(e => e.name)}</span>}
                        {rating && <span>{t("film.imbd_rating")}: {rating}</span>}
                        {filmData.Actors && <span>{t("film.actors")}: {filmData.Actors}</span>}
                        {filmData.runtime && <span>{t("film.runtime")}: {`${filmData.runtime} ${t("film.runt_min")}`}</span>}
                        {filmData.genres && <span>{t("film.genres")}: {filmData.genres.map(e => `${e.name}, `)}</span>}
                        {filmData.overview && <span>{t("film.plot")}: {filmData.overview}</span>}
                    </p>
                </div>
            </div>
        </>
    )
};
