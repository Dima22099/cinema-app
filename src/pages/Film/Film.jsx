import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Loader } from '../../components';
import { Api } from '../../api';

import styles from './Film.module.css';

export const Film = () => {
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
    }); 
    
      useEffect(() => {
        getFilm();
    }, []);

    if (isLoading) {
        return (<div className={styles.spinner}>
            <Loader variant="primary" size={'s'}/>
        </div>)
    }

    if (hasError || !filmData) {
        return <h1 className={styles.loading}>Загрузка...</h1>
    }


    return (
        <>
        <div className={styles.parent}>
            <div className={styles.poster}>
                <img src={`${filmData.Poster}`} alt="Постер фильма"/>
            </div>

            <div className={styles.FilmsDetalis}>
                <h4>{`Title: ${filmData.Title}`}</h4>
                <p>{`Year: ${filmData.Year}`}</p> 
                <p>{`Actors: ${filmData.Actors}`}</p>
                <p>{`Plot: ${filmData.Plot}`}</p> 
                <p>{`Released: ${filmData.Released}`}</p> 
                <p>{`Runtime: ${filmData.Runtime}`}</p> 
                <p>{`imdbRating: ${filmData.imdbRating}`}</p> 
            </div>
        </div>

        <div>
            <NavLink to={`/`} >
                <Button className={styles.btnBack}>Назад</Button>
            </NavLink>
        </div>
        </>
    )
};