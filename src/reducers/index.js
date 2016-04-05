import { combineReducers } from 'redux';
import ProgramReducer from './ProgramReducer.js';
import NewsReducer from './NewsReducer.js';
import ChannelReducer from './ChannelReducer.js';

const rootReducer = combineReducers({
  channels: ChannelReducer,
  news: NewsReducer,
  programs: ProgramReducer,
});

export default rootReducer;
