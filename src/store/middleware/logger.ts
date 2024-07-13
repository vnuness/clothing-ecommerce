import { Middleware, UnknownAction } from 'redux';

import { RootState } from '../store';
import { Action, ActionWithPayload } from '../../utils/reducer/reducer.utils';

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  return next(action);
}