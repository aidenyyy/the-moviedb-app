import { API_URL, API_KEY, POSTER_URL } from './config';

export const fetchMovies = async (sortMethod, page) => {
  const url = `${API_URL}movie/${sortMethod}?api_key=${API_KEY}&page=${page}`;

  return await (await fetch(url)).json();
};

export const fetchMovie = async (movieId) => {
  const url = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
  return await (await fetch(url)).json();
};

export const fetchFavoriteMovies = async (account_id, session_id) => {
  const url = `${API_URL}account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}`;
  return await (await fetch(url)).json();
};

export const fetchRatedMovies = async (account_id, session_id) => {
  const url = `${API_URL}account/${account_id}/rated/movies?api_key=${API_KEY}&session_id=${session_id}`;
  return await (await fetch(url)).json();
};

export const getPoster = (movie) => {
  return `${POSTER_URL}${movie.poster_path}`;
};

export const requestToken = async () => {
  const url = `${API_URL}authentication/token/new?api_key=${API_KEY}`;
  return await (await fetch(url)).json();
};

export const validate = async (username, password, request_token) => {
  const url = `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}&username=${username}&password=${password}&request_token=${request_token}`;
  return await (await fetch(url)).json();
};

export const getSessionId = async (request_token) => {
  const options = { method: 'POST' };
  const url = `${API_URL}authentication/session/new?api_key=${API_KEY}&request_token=${request_token}`;
  return await (await fetch(url, options)).json();
};

export const getAccountDetails = async (session_id) => {
  const url = `${API_URL}account?api_key=${API_KEY}&session_id=${session_id}`;
  return await (await fetch(url)).json();
};

export const setFavorite = async (movie, account_id, session_id, boolean) => {
  const update = {
    media_type: 'movie',
    media_id: movie.id,
    favorite: boolean,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(update),
  };
  const url = `${API_URL}account/${account_id}/favorite?api_key=${API_KEY}&session_id=${session_id}`;
  return await (await fetch(url, options)).json();
};

export const rateMovie = async (movie, session_id, rating) => {
  const update = {
    value: rating,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(update),
  };
  const url = `${API_URL}movie/${movie.id}/rating?api_key=${API_KEY}&session_id=${session_id}`;
  return await (await fetch(url, options)).json();
};

export const logOut = async (session_id) => {
  const options = {
    method: 'DELETE',
  };
  const url = `${API_URL}authentication/session?api_key=${API_KEY}&session_id=${session_id}`;
  return await (await fetch(url, options)).json();
};
