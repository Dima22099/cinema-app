import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FavoritFilms } from '../../context';
import { Api } from '../../api';
import { CardFilm } from '../../components'; 

import styles from './Favorit.module.css';


export const Favorit = () => {
    const { t } = useTranslation();

    const [allFilmsFavorite, setAllFilmsFavorite] = useState([]);
    const { favoritFilms, toggleFavorits  } = useContext(FavoritFilms);

    useEffect(() => {
        const getFavoriteFilms = async () => {
            const promises = Object.keys(favoritFilms).map(async (el) => {
                const { data } = await Api.getFilmData(el);
                return data;
            });
            
            const res = await Promise.all(promises);
            setAllFilmsFavorite(res.sort((a, b) => b.Year - a.Year));
        };

        getFavoriteFilms();
    }, []);

    const handleChecked = (imdbID) => {
        toggleFavorits(imdbID);
        setAllFilmsFavorite(allFilmsFavorite.filter((el) => el.imdbID !== imdbID));
    };
        console.log('allFilmsFavorite', allFilmsFavorite);
    return (
        <div className={styles.favorits}>
            {!allFilmsFavorite.length && <h1 className={styles.favorits__title}>{t("favorite.message")}</h1>}
            {allFilmsFavorite.map((el) => {  
                const isFavorite = Boolean(favoritFilms[el.imdbID]);
                return (
                    <CardFilm
                        key={el.imdbID}
                        title={el.Title} 
                        poster={el.Poster}
                        imdbID={el.imdbID}
                        isFavorite={isFavorite}
                        onFavoriteToggle={() => handleChecked(el.imdbID)}
                    />
                )
            })}
        </div>
    )
};