const axios= require("axios").default;
import {TMDB_BASE_URL,TMDB_IMAGE_BASE_URL,TMDB_API_KEY,ENDPOINTS} from "../constants/Urls";
import languages from "../constants/languages";

const TBMD_HTTP_RRQUEST =axios.create({
    baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

const getNowPlayingMovies  = () =>
TBMD_HTTP_RRQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

const getUpComingMovies  = () =>
TBMD_HTTP_RRQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

const getMovieById = (movieId, append_to_response = "") => 
  TBMD_HTTP_RRQUEST.get(
    `${ENDPOINTS.MOVIE}/${movieId}`,
    append_to_response ? { params: { append_to_response } } : null
  );

const getAllGenres = () =>
TBMD_HTTP_RRQUEST.get(ENDPOINTS.GENRES);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getLanguage =(language_iso)=>
 languages.find(language=> language.iso_639_1===language_iso);

export{getNowPlayingMovies,getUpComingMovies, getPoster, getLanguage,getAllGenres, getMovieById};