const config = require("../../package.json");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const TMDB_API_KEY="6c1a539a78e953624012cd082a0d18dc";
const YOUTUBE_BASE_URL="https://www.youtube.com/watch"

const ENDPOINTS = {
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    UPCOMING_MOVIES: "/movie/upcoming",
    GENRES:"/genre/movie/list",
    MOVIE: "/movie",
};

const APPEND_TO_RESPONSE = {
    CREDITS: "credits",
    RECOMMENDATIONS:"recommendations",
    SIMILAR:"similar",
};

export {TMDB_BASE_URL,TMDB_IMAGE_BASE_URL,TMDB_API_KEY,ENDPOINTS, APPEND_TO_RESPONSE, YOUTUBE_BASE_URL};