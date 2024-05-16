import { configureStore } from '@reduxjs/toolkit';
import  favoriteReducer from './slices/film_research_slices';

const store = configureStore({
    reducer: {
        favorite: favoriteReducer 
    }
});

export default store;
