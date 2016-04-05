import axios from 'axios';

export const FETCH_CHANNEL = 'FETCH_CHANNEL';
export const FETCH_CHANNELS = 'FETCH_CHANNELS';

const ROOT_URL = `http://${process.env.TVGUIDE_HOST}:${process.env.TVGUIDE_PORT}/api`;

export function fetchChannels(time) {
  const request = axios.get(`${ROOT_URL}/channels/${time}`);
  return {
    type: FETCH_CHANNELS,
    payload: request,
  };
}

export function fetchChannel(id) {
  const request = axios.get(`${ROOT_URL}/channel/${id}`);
  return {
    type: FETCH_CHANNEL,
    payload: request,
  };
}
