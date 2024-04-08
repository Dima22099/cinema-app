import { Button } from 'react-bootstrap';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components';
import { Api } from '../../api';
import { FavoritFilms } from '../../context';

import styles from './Film.module.css';


export const Film = () => {
    const { t, i18n } = useTranslation();
    const { favoritFilms, toggleFavorits } = useContext(FavoritFilms)

    const { filmId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [plot, setPlot] = useState({ en: '', ru: '' });
 
    const getFilm = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await Api.getFilmData(filmId);
            const ru = await Api.getTranslate(data.Plot, 'ru');

            setFilmData(data);
            setPlot({ en: data.Plot, ru });
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
        return (<div className={styles.spinner}>
            <Loader variant="primary" size={'s'}/>
        </div>)
    }

    if (!filmData) {
        return <h1 className={styles.loading}>{t("loader")}...</h1>
    }

    if (hasError) {
        return <h1 className={styles.loading}>{t("has_error")} ...</h1>
    }

    const isFavorite = Boolean(favoritFilms[filmId]);
    const buttonText =  t(`film.${isFavorite ? 'remove': 'add_favorite'}`);

    return (
        <>
            <div>
                <NavLink to={'/'} >
                    <Button className={styles.btnback}>{t("film.to_main")}</Button>
                </NavLink>
            </div>

            <div className={styles.parent}>
                <div className={styles.poster}>
                    <img src={filmData.Poster} alt={t("film.poster")}/>
                    <div className={styles.div_button}>
                        <Button 
                        onClick={() => toggleFavorits(filmId)}
                            className={isFavorite ? 'btn-Primary' : 'btn-secondary' }>
                        {buttonText}
                    </Button>
                    </div>
                </div>

                <div className={styles.filmsdetalis}>
                    <h4>{t("film.title")}: {filmData.Title}</h4>
                    <p>{`${t("film.year")}: ${filmData.Year}`}</p> 
                    <p>{`${t("film.actors")}: ${filmData.Actors}`}</p>
                    <p>{`${t("film.plot")}: ${plot[i18n.language]}`}</p> 
                    <p>{`${t("film.relesed")}: ${new Date(filmData.Released).toLocaleDateString("ru")}`}</p> 
                    <p>{`${t("film.runtime")}: ${filmData.Runtime}`}</p> 
                    <p>{`${t("film.imbd_rating")}: ${filmData.imdbRating}`}</p> 
                </div>
            </div>
        </>
    )
};