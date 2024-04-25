import axios from 'axios';

// const API_KEY= 'AIzaSyBsJcQL94GCQtgIl0ekG8RWfhWQrobU2t8'

// export const Api = {
//     searchFilm: async (filmName) => await axios(`https://api.collectapi.com/imdb/imdbSearchByName?query=${filmName}`, {
//                 method: 'GET',
//                 headers: {
//                     "content-type": "application/json",
//                     "authorization": "apikey 0m0jEUzysRtP3Nh2cG6h3e:7DsVfjHS2u6SPmxKuaQXQX"
//                 }
//     }),
//     getFilmData: async (filmId) => await axios(`http://www.omdbapi.com/?i=${filmId}&apikey=d73c3c2a`),
//  };

 export const Api = {
    searchFilm: async (filmName) => await axios(`https://api.themoviedb.org/3/search/movie`, {
                params: { query: `${filmName}`},
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmUwNGMwYWNkZWIzY2YzZTllN2NjMDFhMjMzN2U2NiIsInN1YiI6IjY2MjhkYjAxMzQ0YThlMDE2NmFmMGMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gun3hGvhIUu3Pd84yd36C8RR81pQZryRZz9XX4DEGAE'                }
    }),
    getFilmData: async (id) => await axios(`https://api.themoviedb.org/3/find/${id}`, {
      params: {external_source: 'tvdb_id'},
      headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmUwNGMwYWNkZWIzY2YzZTllN2NjMDFhMjMzN2U2NiIsInN1YiI6IjY2MjhkYjAxMzQ0YThlMDE2NmFmMGMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gun3hGvhIUu3Pd84yd36C8RR81pQZryRZz9XX4DEGAE'
  }
    }),
 };

 // search fo id////
// const options = {
//   method: 'GET',
//   url: 'https://api.themoviedb.org/3/find/268',
//   params: {external_source: 'tvdb_id'},
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmUwNGMwYWNkZWIzY2YzZTllN2NjMDFhMjMzN2U2NiIsInN1YiI6IjY2MjhkYjAxMzQ0YThlMDE2NmFmMGMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gun3hGvhIUu3Pd84yd36C8RR81pQZryRZz9XX4DEGAE'
//   }
// };