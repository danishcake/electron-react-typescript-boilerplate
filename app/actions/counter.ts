import { actionCreatorVoid, RootAction } from './helpers';
import { Dispatch } from 'react';
import { IState } from '../reducers';

export const increment = actionCreatorVoid('INCREMENT_COUNTER');
export const decrement = actionCreatorVoid('DECREMENT_COUNTER');

export function incrementIfOdd() {
  return (dispatch: Dispatch<RootAction>, getState: () => IState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch<RootAction>, getState: () => IState) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
