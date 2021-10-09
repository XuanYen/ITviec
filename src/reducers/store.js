import status from "./status";
import job from "./job";
import acc from "./acc";
import company from "./company";
import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  status, job, company, acc
});
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
export const store = createStore(rootReducer, enhancer);
