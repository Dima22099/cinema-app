import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Loader } from '../../components';

import styles from './Film.module.css';

const wait = (ms) => new Promise((res) => setTimeout(res, ms)); 

export const Film = () => {
    const { filmId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [detalisFilm, setDetalisFilm] = useState(null);
    const [hasError, setHasError] = useState(false);

    const getFilm = async () => {
        try {
            setIsLoading(true);

            await wait(1_000);
            const { data } = await axios(`http://www.omdbapi.com/?i=${filmId}&apikey=d73c3c2a`);

            setDetalisFilm(data);
        } catch (e) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
      useEffect(() => {
        getFilm();
    }, []);

    if (isLoading) {
        return (<div className={styles.spinner}>
            <Loader variant="primary" size={'s'}/>
        </div>)
    }

    if (hasError || !detalisFilm) {
        return <h1>Error</h1>
    }


    return (
        <>
        <div className={styles.parent}>

            <div className={styles.poster}>
                <img src={`${detalisFilm.Poster}`}/>
            </div>

            <div className={styles.FilmsDetalis}>
                <h4>{`Title: ${detalisFilm.Title}`}</h4>
                <p>{`Year: ${detalisFilm.Year}`}</p> 
                <p>{`Actors: ${detalisFilm.Actors}`}</p>
                <p>{`Plot: ${detalisFilm.Plot}`}</p> 
                <p>{`Released: ${detalisFilm.Released}`}</p> 
                <p>{`Runtime: ${detalisFilm.Runtime}`}</p> 
                <p>{`imdbRating: ${detalisFilm.imdbRating}`}</p> 
            </div>
        </div>

        <div>
            <NavLink to={`/`} >
                <Button className={styles.btnBack}>{"Назад"}</Button>
            </NavLink>
        </div>
        </>
    )
};