import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FavoritFilms } from '../../context';
import { Api } from '../../api';
import { CardFilm, Loader } from '../../components'; 

import styles from './Favorit.module.css';


export const Favorit = () => {
    const { t } = useTranslation();

    const [allFilmsFavorite, setAllFilmsFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { favoritFilms, toggleFavorits  } = useContext(FavoritFilms);
    
    useEffect(() => {
        setIsLoading(true);
        const getFavoriteFilms = async () => {
            const promises = Object.keys(favoritFilms).map(async (el) => {
                const { data } = await Api.getFilmData(el);
                return data;
            });
            const res = await Promise.all(promises);
            setAllFilmsFavorite(res);
            setIsLoading(Boolean(res.length));
        };

        getFavoriteFilms();
    }, []);

    const handleChecked = (id) => {
        toggleFavorits(id);
    };
    const URL_Poster = 'https://image.tmdb.org/t/p/w500/';

    return (
        <>
            <h1 className={styles.favorits_title}>{t("favorite.favorits_title")}</h1>
            <div className={styles.favorits}>
                {(!allFilmsFavorite.length && isLoading) ? 
                    (<div className={styles.spinner}><Loader variant="primary" size={'s'}/></div>
                    ) : !allFilmsFavorite.length ? <h1 className={styles.favorits__title}>{t("favorite.message")}</h1>
                    : (allFilmsFavorite.map((el) => {  
                        const isFavorite = Boolean(favoritFilms[el.id]);
                        const relesedDate = new Date(el.release_date).toLocaleDateString("ru");
                        return (
                            <CardFilm
                                key={el.id}
                                isLinkEnabled={true}
                                id={el.id}
                                title={el.title} 
                                rating={el.vote_average.toFixed(1)}
                                release_date={relesedDate}
                                poster={`${URL_Poster}${el.poster_path}`}
                                isFavorite={isFavorite}
                                onFavoriteToggle={() => handleChecked(el.id)}
                            />
                        )
                    })
                )}
            </div>
        </>
    )
};
