require('../app/css/bootstrap.min.css');
require('../app/css/font-awesome.min.css');
require('../app/css/slick.css');
require('../app/css/styles.css');


import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import Login from './components/Login.jsx';
import reducers from './reducers';
import routes from './routes.js';
import promise from 'redux-promise';

const styleTags = document.getElementsByTagName('style');
for (let i = 0; i < styleTags.length; i++) {
  styleTags[i].setAttribute('amp-custom', '');
}
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        { routes }
        <Route path="/login" component={Login} />
      </Router>
    </div>
  </Provider>, document.getElementById('app'));
