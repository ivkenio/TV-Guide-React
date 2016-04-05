import axios from 'axios';

export const FETCH_PROGRAM = 'FETCH_PROGRAM';
export const FILTER_PROGRAMS = 'FILTER_PROGRAMS';

const ROOT_URL = `http://${process.env.TVGUIDE_HOST}:${process.env.TVGUIDE_PORT}/api`;

export function fetchProgram(params) {
  const channelId = params.channel_id;
  const { day, time, name } = params;
  const request = axios.get(`${ROOT_URL}/program/${channelId}/${day}/${time}/${name}`);
  return {
    type: FETCH_PROGRAM,
    payload: request,
  };
}

export function filterPrograms(gender) {
  return {
    type: FILTER_PROGRAMS,
    filter: gender,
  };
}
