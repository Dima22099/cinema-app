import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFavorite } from '../../store/slices/film_research_slices';

import { useTranslation } from 'react-i18next';

import { Api } from '../../api';
import { CardFilm, Loader } from '../../components'; 

import styles from './Favorite.module.css';


export const Favorite = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { allFavorite } = useSelector(state => state.favorite);
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState(null);
    
    useEffect(() => {
        setIsLoading(true);
        const getFavoriteFilms = async () => {
            const promises = Object.keys(allFavorite).map(async (el) => {
                const { data } = await Api.getFilmData(el);
                return data;
            });
            const res = await Promise.all(promises);
            setFilms(res);
            setIsLoading(Boolean(res.length));
        };

        getFavoriteFilms();
    }, []);

    const deleteFilm = (id) => {
        setFilms(films.filter(el => el.id !== id));
        dispatch(toggleFavorite(id));
    }

    return (
        <>
            <h1 className={styles.title}>{t("favorite.title")}</h1>
            <div className={styles.favorites}>
                {(!films && isLoading) ? 
                    (<div className={styles.spinner}>
                        <Loader variant="primary" size={'s'}/>
                    </div>
                    ) : !films
                    ? <h1 className={styles.Favorites__title}>{t("favorite.message")}</h1>
                    : (films.map((el) => {  
                        const isFavorite = Boolean(allFavorite[el.id]);
                        const releaseDate = new Date(el.release_date).toLocaleDateString("ru");
                        return (
                            <CardFilm
                                key={el.id}
                                isLinkEnabled={true}
                                id={el.id}
                                title={el.title} 
                                rating={el.vote_average.toFixed(1)}
                                releaseDate={releaseDate}
                                poster={Api.getPosterURL(el.poster_path)}
                                isFavorite={isFavorite}
                                onFavoriteToggle={() => deleteFilm(el.id)}
                            />
                        )
                    })
                )}
            </div>
        </>
    )
};
