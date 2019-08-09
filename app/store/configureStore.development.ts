import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, push } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

import * as counterActions from '../actions/counter';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};

const actionCreators = Object.assign({},
  counterActions,
  {push}
);

const logger = (<any>createLogger)({
  level: 'info',
  collapsed: true
});

export const history = createHashHistory();

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators
  }) as any :
  compose;


export const createStore = (initialState?: object) => {
  const store = reduxCreateStore(createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), logger))
  );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
};
