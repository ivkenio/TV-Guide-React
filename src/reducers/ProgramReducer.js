import {
  FETCH_PROGRAM,
  FILTER_PROGRAMS } from '../actions/programs';

const INITIAL_STATE = { program: null, gender: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PROGRAM: {
      return { ...state, program: action.payload.data };
    }
    case FILTER_PROGRAMS: {
      return { ...state, gender: action.filter };
    }
    default: {
      return state;
    }
  }
}
