import {
  FETCH_CHANNEL,
  FETCH_CHANNELS,
  FILTER_CHANNELS } from '../actions/channels';

const INITIAL_STATE = { all: [], channel: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CHANNEL: {
      return { ...state, channel: action.payload.data };
    }
    case FETCH_CHANNELS: {
      return { ...state, all: (action.payload.data).filter(channel => channel.Programs.length > 0) };
    }
    default: {
      return state;
    }
  }
}
