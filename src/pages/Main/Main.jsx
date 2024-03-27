import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Input, CustomCard } from '../../components'; 
import styles from './Main.module.css';

export const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [films, setFilms] = useState(null);

    const getFilms = async (e) => {
        e.preventDefault();

        const { data } = await axios(`https://api.collectapi.com/imdb/imdbSearchByName?query=${inputValue}`, {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": "apikey 0m0jEUzysRtP3Nh2cG6h3e:7DsVfjHS2u6SPmxKuaQXQX"
            }
        });
        setInputValue(e.target.reset());
        setFilms(data.result);
    };

    return (
        <div className={styles.main}>
            <h1>Кинопоиск</h1>

            <form onSubmit={getFilms} className={styles.form}>
                <Input 
                    value={inputValue} 
                    name="input" 
                    className={styles.input} 
                    placeholder=' search films' 
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type={'submit'} label="Поиск" /> 
            </form> 

            <div className={styles.films}> 
                {films && films.length > 0 ?
                    films.map((el) => 
                    <NavLink to={`/film/${el.imdbID}`} key={crypto.randomUUID()}>
                        <CustomCard  
                            title={el.Title} 
                            poster={el.Poster} 
                            year={el.Year} 
                            imdbID={el.imdbID}
                            textbtn={'View details'}
                        />
                    </NavLink>
                    ) : <h4>Введите название фильма</h4>
                }
            </ div>
        </div>
    )
};
