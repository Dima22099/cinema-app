import axios from 'axios';

export const Api = {
    searchFilm: async (filmName) => await axios(`https://api.collectapi.com/imdb/imdbSearchByName?query=${filmName}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "authorization": "apikey 0m0jEUzysRtP3Nh2cG6h3e:7DsVfjHS2u6SPmxKuaQXQX"
                }
    }),
    getFilmData: async (filmId) => await axios(`http://www.omdbapi.com/?i=${filmId}&apikey=d73c3c2a`)
};