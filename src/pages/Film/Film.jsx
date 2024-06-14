import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'react-bootstrap-icons';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import cn from 'classnames';

import { Api } from '../../api';
import { Loader } from '../../components';
import { toggleFavorite } from '../../store/userSlice';

import styles from './Film.module.css';


export const Film = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { allFavorite } = useSelector((state) => state.user);
    const star = '/star.svg';

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [filmData, setFilmData] = useState(null);
    const [hasError, setHasError] = useState(false);

    const getFilm = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await Api.getFilmData(id);
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
        return (
            <div className={styles.spinner}>
                <Loader variant="primary" size={'s'}/>
            </div>
        )
    }

    if (!filmData) {
        return <h1 className={styles.loader}>{t("loader")}...</h1>
    }

    if (hasError) {
        return <h1 className={styles.loader}>{t("has_error")} ...</h1>
    }
    
    const isFavorite = Boolean(allFavorite[id]);
    const releaseDate = new Date(filmData.release_date).toLocaleDateString("ru");
    const rating = filmData.vote_average.toFixed(1);

    return (
        <>
            <div className={styles.link__wrapper}>
                <NavLink to={'/'} className={styles.link}>
                    <ArrowLeft size={40} />
                    <span>{t("film.to_main")}</span>
                </NavLink>
            </div>
            <div className={styles.film_title}>
                <p className={styles.film_title_search}>{t("film.search_film")}</p>
                {filmData.title && <h4>{filmData.title}</h4>}
            </div>
            <div className={styles.poster__wrapper}>
                <img src={Api.getPosterURL(filmData.poster_path)} className={styles.card__image}  alt='image film' />
                <div className={styles.film}>
                    <div className={styles.film__detail}>
                        {filmData.overview ? filmData.overview : ''}
                        <div className={styles.film_detail_starAndReting}>
                            <span className={styles.star_rating}>
                            <img src={star} alt='no image star' />
                            <span>{rating}</span>
                        </span>
                        <span className={cn(styles.card__favorite, { [styles.card__favorite__checked]: isFavorite })} onClick={() => dispatch(toggleFavorite(id))}>
                        {isFavorite ? (
                        <>
                            <img src={'/bookmark_green.svg'} alt='icon_logo' />
                            {t("film.remove")}
                        </>
                     ) : (
                        <>
                            <img alt='like icon' src={'/like.svg'} />
                            {t("film.add_favorite")}
                        </>)
                        }
                    </span>
                        </div>
                        <div className={styles.info}>
                        {releaseDate && <>{t("film.year")}: <p>{releaseDate}</p></>}
                        {filmData.production_countries && <>{t("film.origin_country")}: <p>{filmData.production_countries.map(e => e.name)}</p></>}
                        {filmData.Actors && <>{t("film.actors")}: <p>{filmData.Actors}</p></>}
                        {filmData.runtime && <>{t("film.runtime")}: <p>{`${filmData.runtime} ${t("film.runt_min")}`}</p></>}
                        {filmData.genres && <>{t("film.genres")}: <p>{filmData.genres.map(e => `${e.name}, `)}</p></>}
                        </div>
                    </div>
                </div>
            </div>
                    <span className={styles.reviews_name}>{t("film.reviews_name")}</span>
                    <div className={styles.reviews}>
                        <p className={styles.reviews_detail}>
                            <span className={styles.reviews_title}>Not as good as infinity war..</span><span>19-04-2019</span>
                        </p>
                        <p>
                            But its a pretty good film. A bit of a mess in some parts, lacking the cohesive and effortless feel infinity
                            war somehow managed to accomplish. Some silly plot holes and characters that could&apos;ve been cut (Ahem,
                            captain marvel and thanos). The use of Captain marvel in this film was just ridiculous. Shes there at the start,
                            bails for some reason? And then pops up at the end to serve no purpose but deux ex machina a space ship...
                        </p>
                    </div>
        </>
    )
};
