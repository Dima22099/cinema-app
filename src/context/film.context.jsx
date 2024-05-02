import { createContext, useState } from 'react';

export const FavoriteFilms = createContext({});

export const FilmsContextProvider = ({ children }) => {
  const [favoriteFilms, setFavoriteFilms] = useState(JSON.parse(localStorage.getItem('favoriteFilms')) ?? {});
   
  const toggleFavorites = (id) => {
    if (favoriteFilms[id]) {
      const temp = {...favoriteFilms};
      delete temp[id]; 

      localStorage.setItem('favoriteFilms', JSON.stringify(temp));
      return setFavoriteFilms(temp); 
    }

    setFavoriteFilms((films) => ({ ...films, [id]: true }));
    localStorage.setItem('favoriteFilms', JSON.stringify({ ...favoriteFilms, [id]: true }))
  };

  return (
    <FavoriteFilms.Provider value={{ favoriteFilms, toggleFavorites }}>
      {children}
    </FavoriteFilms.Provider>
  );
};
