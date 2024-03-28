import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Button, CustomCard, Loader } from '../../components'; 

import styles from './Main.module.css';


export const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState(null);
    const [hasError, setHasError] = useState(false);

    const getFilms = async (e) => {
        setFilms(null);
        try {
            e.preventDefault();
    
            setIsLoading(true);
            const { data } = await axios(`https://api.collectapi.com/imdb/imdbSearchByName?query=${inputValue}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "authorization": "apikey 0m0jEUzysRtP3Nh2cG6h3e:7DsVfjHS2u6SPmxKuaQXQX"
                }
            })
            setFilms(data.result);
        } catch(e) {
            setHasError(true);
        } finally {
            setInputValue(e.target.reset());
            setIsLoading(false);
        }
    };
    
    if (hasError) {
        return <h1 className={styles.error}>Ничего не нашлось</h1>
    }
    return (
        <div className={styles.main}>
            <h1>Кинопоиск</h1>

            <form onSubmit={getFilms} className={styles.form}>
                <InputGroup>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={inputValue} 
                        placeholder='search films'
                        onChange={({ target: { value }}) => setInputValue(value)} 
                        autoFocus
                    />
                </InputGroup>
                <Button type={'submit'} label="Поиск" /> 
            </form> 

            <div className={styles.films}> 
                {(!isLoading && !films) && <h1>Введите фильм</h1>}
    

                {(isLoading) && <Loader size={'s'} variant={'primary'} />}

                {films && films.length > 0 &&
                    films.map((el) => 
                    <NavLink to={`/film/${el.imdbID}`} key={crypto.randomUUID()}>
                        <CustomCard  
                            title={el.Title} 
                            poster={el.Poster} 
                            year={el.Year} 
                            imdbID={el.imdbID}
                            buttonText={'View details'}
                        />
                    </NavLink>
                )}
            </ div>
        </div>
    )
};
