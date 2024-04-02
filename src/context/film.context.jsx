import { createContext, useState } from 'react';

export const FavoritFilms = createContext({});

export const FilmsContextProvider = ({ children }) => {
  const [favoritFilms, setFavoritFilms] = useState(JSON.parse(localStorage.getItem('favoriteFilms')) ?? {});
   
  const toggleFavorits = (filmId) => {
    if (favoritFilms[filmId]) {
      const temp = {...favoritFilms};
      delete temp[filmId]; 

      localStorage.setItem('favoriteFilms', JSON.stringify(temp));
      return setFavoritFilms(temp); 
    }

    setFavoritFilms((films) => ({ ...films, [filmId]: true }));
    localStorage.setItem('favoriteFilms', JSON.stringify({ ...favoritFilms, [filmId]: true }))
  };

  return (
    <FavoritFilms.Provider value={{ favoritFilms, toggleFavorits }}>
      {children}
    </FavoritFilms.Provider>
  );
};
