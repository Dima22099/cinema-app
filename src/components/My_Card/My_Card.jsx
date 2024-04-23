import { NavLink } from 'react-router-dom';

import cn from 'classnames';

import styles from './My_Card.module.css';


export const My_Card = ({ title, poster, addFavorite, imdbID, isFavorite, onFavoriteToggle }) => (
  <div className={styles.card} key={imdbID}>   
    <NavLink to={`/film/${imdbID}`} className={styles.card__content__link}>
        <div className={styles.card_image}>
            <img src={poster} className={styles.card__poster}/>
            {title}
        </div>
    </NavLink>  
        <div className={cn(styles.card__star, { [styles.card__star__checked]: isFavorite })} onClick={() => onFavoriteToggle(imdbID)}>
            <img 
                alt='like icon'
                src={'/like.svg'}
                />
                {addFavorite}
        </div>
    </div>
);
{/* backgroundImage: `url(${backgroundImage}) */}
