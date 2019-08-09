import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();

export const createStore = (initialState?: object) => {
  return reduxCreateStore(createRootReducer(history),
    initialState,
    compose(applyMiddleware(thunk, routerMiddleware(history)))
  );
};
