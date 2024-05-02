import axios from 'axios';
import i18n from '../i18n';

export const Api = {
  searchFilm: async (filmName) => await axios('https://api.themoviedb.org/3/search/movie', {
    params: { query: filmName, },
  }),

  getFilmData: async (id) => await axios(`https://api.themoviedb.org/3/movie/${id}`),

  getPosterURL: (urlPathPosters) => `https://image.tmdb.org/t/p/w500/${urlPathPosters}`,
};          

axios.interceptors.request.use((config) => {
config.params = {
  ...config.params,
  language: i18n.language,
};
  config.headers = { 
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmUwNGMwYWNkZWIzY2YzZTllN2NjMDFhMjMzN2U2NiIsInN1YiI6IjY2MjhkYjAxMzQ0YThlMDE2NmFmMGMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gun3hGvhIUu3Pd84yd36C8RR81pQZryRZz9XX4DEGAE'}
    return config;
});