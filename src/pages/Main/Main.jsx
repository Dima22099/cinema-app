import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';

import { Api } from '../../api';
import { FavoriteFilms } from '../../context/';
import { Loader, CardFilm, Button } from '../../components';

import styles from './Main.module.css';


export const Main = () => {
    const { t } = useTranslation();

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState(null);
    const [hasError, setHasError] = useState(false);

    const { favoriteFilms, toggleFavorites  } = useContext(FavoriteFilms);

    const getFilms = async (e) => {
        setFilms(null);
        try {
            e.preventDefault();

            setIsLoading(true);
            const { data } = await Api.searchFilm(inputValue);
            setFilms(data.results.sort((a, b) => b.vote_average - a.vote_average));
        } catch(e) {
            setHasError(true);
        } finally {
            setInputValue('');
            setIsLoading(false);
        }
    };

    if (hasError) {
        return (
            <div className={styles.has_error_message}>
                <h1>{t("has_error")}</h1>
                <p>{t("has_error_details")}</p>
            </div>
        )
    }

    const onFavoriteToggle = (id) => toggleFavorites(id);

    return (
        <div className={styles.main}>
            <div className={styles.search}>
                <h1 className={styles.title}>{t("title")}</h1>
                <p className={styles.search_text}>{t("main.searchDetails")}</p>
                <div className={styles.search_input_button}>
                <form onSubmit={getFilms} className={styles.form}>
                <InputGroup className={styles.input_group}>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        className={styles.input_group_input}
                        value={inputValue}
                        placeholder={t("main.placeholder")}
                        onChange={({ target: { value }}) => setInputValue(value)}
                        autoFocus
                    />
                </InputGroup>
                <Button 
                    type={'submit'} 
                    title={t("search")} 
                    disabled={!inputValue.length} 
                />
                </form>
                </div>
            </div>
            <div className={styles.films_content}>
                <div className={styles.films}>
                    {isLoading && <div className={styles.spinner}><Loader size={'s'} variant={'primary'}/></div>}
                    {(!isLoading && !films) && <h1 className={styles.film_search}>{t('main.title')}</h1>}
                    {(!isLoading && films && films.length > 0) && films.map((el) => {
                        const isFavorite = Boolean(favoriteFilms[el.id]);
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
                            onFavoriteToggle={() => onFavoriteToggle(el.id)}
                        />
                    )}
                    )}
                </div>
            </ div>
        </div>
    )
};
