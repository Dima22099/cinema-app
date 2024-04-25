import { createContext, useState } from 'react';

export const FavoritFilms = createContext({});

export const FilmsContextProvider = ({ children }) => {
  const [favoritFilms, setFavoritFilms] = useState(JSON.parse(localStorage.getItem('favoriteFilms')) ?? {});
   
  const toggleFavorits = (id) => {
    if (favoritFilms[id]) {
      const temp = {...favoritFilms};
      delete temp[id]; 

      localStorage.setItem('favoriteFilms', JSON.stringify(temp));
      return setFavoritFilms(temp); 
    }

    setFavoritFilms((films) => ({ ...films, [id]: true }));
    localStorage.setItem('favoriteFilms', JSON.stringify({ ...favoritFilms, [id]: true }))
  };

  return (
    <FavoritFilms.Provider value={{ favoritFilms, toggleFavorits }}>
      {children}
    </FavoritFilms.Provider>
  );
};
