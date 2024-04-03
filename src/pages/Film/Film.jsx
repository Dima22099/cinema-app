import { Button } from 'react-bootstrap';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Loader } from '../../components';
import { Api } from '../../api';
import { FavoritFilms } from '../../context';

import styles from './Film.module.css';

export const Film = () => {
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
        return (<div className={styles.spinner}>
            <Loader variant="primary" size={'s'}/>
        </div>)
    }

    if (!filmData) {
        return <h1 className={styles.loading}>Загрузка...</h1>
    }

    if (hasError) {
        return <h1 className={styles.loading}>Ошибка загрузки ...</h1>
    }


    const isFavorite = Boolean(favoritFilms[filmId]);
    const buttonText = isFavorite ? "Удалить из избранного" : "Добавить в избранное";
    return (
        <>
            <div>
                <NavLink to={'/'} >
                    <Button className={styles.btnback}>На главную</Button>
                </NavLink>
            </div>

            <div className={styles.parent}>
                <div className={styles.poster}>
                    <img src={filmData.Poster} alt="Постер фильма"/>

                    <Button 
                        onClick={() => toggleFavorits(filmId)}
                        className={isFavorite ? styles.add_favorite : styles.delete_favorite}>
                        {buttonText}
                    </Button>
                </div>

                <div className={styles.filmsdetalis}>
                    <h4>{`Title: ${filmData.Title}`}</h4>
                    <p>{`Year: ${filmData.Year}`}</p> 
                    <p>{`Actors: ${filmData.Actors}`}</p>
                    <p>{`Plot: ${filmData.Plot}`}</p> 
                    <p>{`Released: ${filmData.Released}`}</p> 
                    <p>{`Runtime: ${filmData.Runtime}`}</p> 
                    <p>{`imdbRating: ${filmData.imdbRating}`}</p> 
                </div>
            </div>

        </>
    )
};