import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import TodoReducer from "../reducers/todoReducer";

export default createStore(combineReducers({ TodoReducer }), {}, applyMiddleware(thunk));
