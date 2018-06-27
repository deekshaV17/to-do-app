import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import TodoReducer from '../reducers/todoReducer';

const loggerMiddleware = createLogger({ predicate: () => ({ logger: console, diff: true }) });

export default createStore(combineReducers({TodoReducer}), {}, applyMiddleware(thunk));
