import { createSlice } from '@reduxjs/toolkit';

const themes = {
  dark: 'dark',
  light: 'light',
};

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (Object.values(themes).includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return theme.light;
  return theme;
}; 

const initialState = {
    theme: getTheme(),
    allFavorite: JSON.parse(localStorage.getItem('favoriteFilms')) ?? {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            if (state.allFavorite[action.payload]) {
                delete state.allFavorite[action.payload];
                
                localStorage.setItem('favoriteFilms', JSON.stringify(state.allFavorite));
                return state;
            }

            state.allFavorite[action.payload] = true;
            localStorage.setItem('favoriteFilms', JSON.stringify(state.allFavorite));
        }, 

        changeTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
});

export const { toggleFavorite, changeTheme } = userSlice.actions;
export default userSlice.reducer;
