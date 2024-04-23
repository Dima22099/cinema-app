import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';

import { Api } from '../../api';
import { FavoritFilms } from '../../context/';
import { Loader, My_Card } from '../../components';

import styles from './Main.module.css';


export const Main = () => {
    const { t } = useTranslation();

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState(null);
    const [hasError, setHasError] = useState(false);

    const { favoritFilms, toggleFavorits  } = useContext(FavoritFilms);

    const getFilms = async (e) => {
        setFilms(null);
        try {
            e.preventDefault();

            setIsLoading(true);
            const { data } = await Api.searchFilm(inputValue);

            console.log('### data', data);
            setFilms(data.result.sort((a, b) => b.Year - a.Year));
        } catch(e) {
            setHasError(true);
        } finally {
            setInputValue('');
            setIsLoading(false);
        }
    };

    if (hasError) {
        return (
            <div>
                <InputGroup className={styles.input_group}>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={inputValue}
                        placeholder={t("main.placeholder")}
                        onChange={({ target: { value }}) => setInputValue(value)}
                        autoFocus
                    />
                </InputGroup>
                <Button type={'submit'} variant="primary" className={styles.input_group_btn} disabled={!inputValue.length}>
                    {t("search")}
                </Button>
                <div className={styles.has_error_message}>
                    <h1>{t("has_error")}</h1>
                    <p>{t("has_error_detalis")}</p>
                </div>
            </div>
        )
    }

    const onFavoriteToggle = (imdbID) => toggleFavorits(imdbID);

    return (
        <div className={styles.main}>
            <div className={styles.search}>
                    <h1 className={styles.title}>{t("search")}</h1>
                    <p className={styles.search_text}>{t("main.search_detalis")}</p>
                    <div className={styles.search_input_button}>
                        <form onSubmit={getFilms} className={styles.form}>
                            {/* TODO: удалить react-bootstrap и использовать свои кастомыне компоненеты */}
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
                            <Button type={'submit'} variant="primary" className={styles.input_group_btn} disabled={!inputValue.length}>
                                {t("search")}
                            </Button>
                        </form>
                    </div>
            </div>

            <div className={styles.films_content}>
                <div className={styles.films}>
                    {isLoading &&  <Loader size={'s'} variant={'primary'} />}
                    {/* {(!isLoading && !films) && <h1>{t('main.title')}</h1>} */}
                    {(!isLoading && films && films.length > 0) &&
                        films.map((el) => {
                            const isFavorite = Boolean(favoritFilms[el.imdbID]);

                            return (
                                <My_Card
                                    key={el.imdbID}
                                    year={el.Year}
                                    title={el.Title}
                                    imdbID={el.imdbID}
                                    poster={el.Poster}
                                    isFavorite={isFavorite}
                                    onFavoriteToggle={() => onFavoriteToggle(el.imdbID)}
                                />
                        )}
                    )}
                </div>
            </ div>
        </div>
    )
};
