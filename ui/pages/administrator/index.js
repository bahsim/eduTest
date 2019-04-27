import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as main 	from './reducers/main';

import Main from './containers/Main'

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    ...main,
    routing: routerReducer,
  }),
  applyMiddleware(routerMiddleware(history)),
);

render(
  <Provider store={store}>
    <Router history={history}>
			<Main />
    </Router>
  </Provider>,
	document.getElementById('app')
);
