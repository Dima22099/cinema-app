import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InputGroup from 'react-bootstrap/InputGroup';

import { Api } from '../../api';
import { FavoritFilms } from '../../context/';
import { CustomCard, Loader } from '../../components'; 

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
            setFilms(data.result.sort((a, b) => b.Year - a.Year));
        } catch(e) {
            setHasError(true);
        } finally {
            setInputValue('');
            setIsLoading(false);
        }
    };
    
    if (hasError) {
        return <h1 className={styles.error}>{t("has_error")}</h1>
    }

    const onFavoriteToggle = (imdbID) => toggleFavorits(imdbID);

    return (
        <div className={styles.main}>
            <h1>{t("title")}</h1>

            <form onSubmit={getFilms} className={styles.form}>
                <InputGroup>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={inputValue} 
                        placeholder={t("main.placeholder")}
                        onChange={({ target: { value }}) => setInputValue(value)} 
                        autoFocus
                    />
                </InputGroup>
                <Button type={'submit'} variant="primary">{t("search")}</Button> 
            </form> 

            <div>
                <div className={styles.films}> 
                    {isLoading &&  <Loader size={'s'} variant={'primary'} />}
        
                    {(!isLoading && !films) && <h1>{t('main.title')}</h1>}

                    {(!isLoading && films && films.length > 0) &&
                        films.map((el) => {
                            const isFavorite = Boolean(favoritFilms[el.imdbID]);

                            return (
                                <CustomCard  
                                    key={el.imdbID}
                                    year={el.Year} 
                                    title={el.Title} 
                                    imdbID={el.imdbID}
                                    poster={el.Poster}
                                    buttonText={t("main.details")}
                                    isFavorite={isFavorite}
                                    onFavoriteToggle={onFavoriteToggle}
                                />
                            )}
                    )}
                </div>
            </ div>
        </div>
    )
};