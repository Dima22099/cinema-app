import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allFavorite: JSON.parse(localStorage.getItem('favoriteFilms')) ?? {},
}

const favoriteSlice = createSlice({
    name: 'favoriteFilms',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            if (state.allFavorite[action.payload]) {
                delete state.allFavorite[action.payload];
                
                localStorage.setItem('favoriteFilms', JSON.stringify(state.allFavorite));
                return state.allFavorite;
            }

            state.allFavorite[action.payload] = true;
            localStorage.setItem('favoriteFilms', JSON.stringify(state.allFavorite));
        }
    }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
