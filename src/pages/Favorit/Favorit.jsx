import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FavoritFilms } from '../../context';
import { Api } from '../../api';
import { CustomCard } from '../../components'; 

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

    return (
        <div className={styles.favorits}>
            {!allFilmsFavorite.length && <h1 className={styles.title}>{t("favorite.message")}</h1>}
            {allFilmsFavorite.map((el) => {  
                const isFavorite = Boolean(favoritFilms[el.imdbID]);
                return (
                    <CustomCard  
                        key={el.imdbID}
                        year={el.Year} 
                        title={el.Title} 
                        imdbID={el.imdbID}
                        poster={el.Poster}
                        buttonText={t("favorite.view_details")}
                        isFavorite={isFavorite}
                        onFavoriteToggle={handleChecked}
                    />
                )                
            })}
        </div>
    )
};


