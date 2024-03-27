import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Film.module.css';

export const Film = () => {
    const { filmId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [detalisFilm, setDetalisFilm] = useState(null);

    const getFilm = async () => {
        setIsLoading(true);
        const res = await axios(`http://www.omdbapi.com/?i=${filmId}&apikey=d73c3c2a`);
        setDetalisFilm(res.data);
        setIsLoading(false);
    };
    
      useEffect(() => {

        getFilm();
    }, []);

    if (!detalisFilm || isLoading) {
        return <h1>Загрузка</h1>
    }

    return (
        
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
    )
};