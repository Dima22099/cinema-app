import { useCallback, useContext, useEffect, useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Loader, CardFilm } from '../../components';
import { Api } from '../../api';
import { FavoritFilms } from '../../context';

import styles from './Film.module.css';
import cn from 'classnames';


export const Film = () => {
    const { t } = useTranslation();
    const { favoritFilms, toggleFavorits } = useContext(FavoritFilms)

    const { filmId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData] = useState(null);
    const [hasError, setHasError] = useState(false);

    const getFilm = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await Api.getFilmData(filmId);
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

    const isFavorite = Boolean(favoritFilms[filmId]);
    const relesedDate = new Date(filmData.Released).toLocaleDateString("ru");

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
                        title={filmData.Title}
                        poster={filmData.Poster}
                        imdbID={filmData.imdbID}
                        isFavorite={isFavorite}
                        onFavoriteToggle={() => toggleFavorits(filmId)}
                        className={cn(styles.card__favorite, { [styles.card__favorite__checked]: isFavorite })}
                     />
                <div className={styles.film}>
                    <p className={styles.film__detail}>
                        <span>{t("film.title")}: {filmData.Title}</span><br />
                        <span>{t("film.year")}: {filmData.Year}</span><br />
                        <span>{t("film.actors")}: {filmData.Actors}</span><br />
                        <span>{t("film.plot")}: {filmData.Plot}</span><br />
                        <span>{t("film.relesed")}: {relesedDate}</span><br />
                        <span>{t("film.runtime")}: {filmData.Runtime}</span><br />
                        <span>{t("film.imbd_rating")}: {filmData.imdbRating}</span><br />
                    </p>
                </div>
            </div>
        </>
    )
};
