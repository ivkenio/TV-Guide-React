import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import SchedulesList from './containers/SchedulesList.jsx';
import Channel from './components/Channel.jsx';
import Program from './components/Program.jsx';
import News from './containers/News.jsx';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={SchedulesList} />
    <Route path="/kategori/:time" component={SchedulesList} />
    <Route path="/kanaler/:id" component={Channel} />
    <Route path="/programmer/:channel_id/:day/:time/:name" component={Program} />
    <Route path="/nyheder/:id/:name" component={News} />
  </Route>
);
