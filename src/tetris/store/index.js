import { createStore, compose, applyMiddleware } from "redux";

import { createInitalState } from "../helpers";

import tickReducer from "./tickReducer";
import shiftReducer from "./shiftReducer/";
import rotateReducer from "./rotateReducer/";

const initialState = createInitalState();

const reducers = {
  TICK: tickReducer,
  SHIFT: shiftReducer,
  ROTATE: rotateReducer
};

function tetrisReducer(state = initialState, { type, payload }) {
  return reducers[type] ? reducers[type](state, payload) : state;
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware()
  // other store enhancers if any
);

export default createStore(tetrisReducer, enhancer);
