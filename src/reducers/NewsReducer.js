import {
  FETCH_NEWS,
  FETCH_SINGLE_NEWS } from '../actions/news';

const INITIAL_STATE = { all: [], singleNews: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_NEWS: {
      return { ...state, all: action.payload.data };
    }
    case FETCH_SINGLE_NEWS: {
      return { ...state, singleNews: action.payload.data };
    }
    default: {
      return state;
    }
  }
}
