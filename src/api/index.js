import axios from 'axios';

const API_KEY= 'AIzaSyBsJcQL94GCQtgIl0ekG8RWfhWQrobU2t8'

export const Api = {
    searchFilm: async (filmName) => await axios(`https://api.collectapi.com/imdb/imdbSearchByName?query=${filmName}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "authorization": "apikey 0m0jEUzysRtP3Nh2cG6h3e:7DsVfjHS2u6SPmxKuaQXQX"
                }
    }),
    getFilmData: async (filmId) => await axios(`http://www.omdbapi.com/?i=${filmId}&apikey=d73c3c2a`),
    getTranslate: async (text, lang) => {
        const { data: { data: { translations } }} =  await axios.post(`https://translation.googleapis.com/language/translate/v2?key= ${API_KEY}`, {
            q: text,
            target: lang,
        })    
        return translations[0].translatedText;
    }
 };
