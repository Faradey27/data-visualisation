// https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducer';

export const configureStore = (initialState = {}) => {
  const loggerMiddleware = createLogger();

  const middleware =
    process.env.NODE_ENV === 'production'
      ? [thunkMiddleware]
      : [thunkMiddleware, loggerMiddleware];

  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};
