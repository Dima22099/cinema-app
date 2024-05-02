import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FavoriteFilms } from '../../context';
import { Api } from '../../api';
import { CardFilm, Loader } from '../../components'; 

import styles from './Favorite.module.css';


export const Favorite = () => {
    const { t } = useTranslation();

    const [allFilmsFavorite, setAllFilmsFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { favoriteFilms, toggleFavorites  } = useContext(FavoriteFilms);
    
    useEffect(() => {
        setIsLoading(true);
        const getFavoriteFilms = async () => {
            const promises = Object.keys(favoriteFilms).map(async (el) => {
                const { data } = await Api.getFilmData(el);
                return data;
            });
            const res = await Promise.all(promises);
            setAllFilmsFavorite(res);
            setIsLoading(Boolean(res.length));
        };

        getFavoriteFilms();
    }, []);


    return (
        <>
            <h1 className={styles.favorites_title}>{t("favorite.favorites_title")}</h1>
            <div className={styles.Favorites}>
                {(!allFilmsFavorite.length && isLoading) ? 
                    (<div className={styles.spinner}>
                        <Loader variant="primary" size={'s'}/>
                    </div>
                    ) : !allFilmsFavorite.length 
                    ? <h1 className={styles.Favorites__title}>{t("favorite.message")}</h1>
                    : (allFilmsFavorite.map((el) => {  
                        const isFavorite = Boolean(favoriteFilms[el.id]);
                        const release_Date = new Date(el.release_date).toLocaleDateString("ru");
                        return (
                            <CardFilm
                                key={el.id}
                                isLinkEnabled={true}
                                id={el.id}
                                title={el.title} 
                                rating={el.vote_average.toFixed(1)}
                                release_date={release_Date}
                                poster={Api.getPosterURL(el.poster_path)}
                                isFavorite={isFavorite}
                                onFavoriteToggle={() => toggleFavorites(el.id)}
                            />
                        )
                    })
                )}
            </div>
        </>
    )
};
