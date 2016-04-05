import axios from 'axios';

export const FETCH_NEWS = 'FETCH_NEWS';
export const FETCH_SINGLE_NEWS = 'FETCH_SINGLE_NEWS';

const ROOT_URL = `http://${process.env.TVGUIDE_HOST}:${process.env.TVGUIDE_PORT}/api`;

export function fetchNews() {
  const request = axios.get(`${ROOT_URL}/news/all`);
  return {
    type: FETCH_NEWS,
    payload: request,
  };
}

export function fetchSingleNews(id) {
  const request = axios.get(`${ROOT_URL}/news/?id=${id}`);
  return {
    type: FETCH_SINGLE_NEWS,
    payload: request,
  };
}
