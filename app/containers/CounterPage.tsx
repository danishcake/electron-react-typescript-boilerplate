import * as React from 'react';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Counter, IStateProps, IDispatchProps, Props } from '../components/Counter';
import * as CounterActions from '../actions/counter';
import { IState } from '../reducers';
import { IAction } from '../actions/helpers';

function mapStateToProps(state: IState): IStateProps {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, void, IAction>): IDispatchProps {
  return bindActionCreators(CounterActions as any, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Counter) as any as React.StatelessComponent<Props>);
