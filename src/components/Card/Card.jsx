import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

import cn from 'classnames';

import styles from './Card.module.css';


export const CustomCard = ({ title, year, poster, buttonText, imdbID, isFavorite, onFavoriteToggle }) => (
  <Card className={styles.card}>     
    <div>
        <Card.Img variant="top" src={poster} className={styles.card__poster} />
        <div onClick={() => onFavoriteToggle(imdbID)}>
            <img className={cn(styles.card__star, { [styles.card__star__checked]: isFavorite })}
                src={'/star-sharp-svgrepo-com.svg'}
                alt='img favorits'
            />
        </div>
    </div>

    <Card.Body className={styles.card__content}>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{year}</Card.Text>
        <NavLink to={`/film/${imdbID}`} className={styles.card__content__link}>
          <Button variant="primary">{buttonText}</Button>
        </NavLink>
    </Card.Body>
  </Card>
);