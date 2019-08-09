import { combineReducers } from 'redux';
import counter, { TState as TCounterState } from './counter';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

export interface IState {
  counter: TCounterState;
}

export default (history: History) => combineReducers({
  router: connectRouter(history),
  counter
});
