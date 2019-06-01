import { createStore, compose, applyMiddleware } from "redux";

import shiftLeft from "./helpers/shiftLeft";
import shiftRight from "./helpers/shiftRight";
import shiftUp from "./helpers/shiftUp";

import shiftDown from "./helpers/shiftDown";

import { rotateClockwise, rotateCounterClockwise } from "./helpers/rotate";

import { createInitalState } from "./helpers";

import tickReducer from "./tickReducer";

const initialState = createInitalState();
const shiftFns = {
  LEFT: shiftLeft,
  RIGHT: shiftRight,
  DOWN: shiftDown,
  UP: shiftUp
};
const rotateFns = {
  CLOCKWISE: rotateClockwise,
  COUNTER_CLOCKWISE: rotateCounterClockwise
};

const reducers = {
  TICK: tickReducer,
  SHIFT: (state, payload) => {
    return (shiftFns[payload] || (() => null))(state) || { ...state };
  },
  ROTATE: (state, payload) => {
    return (rotateFns[payload] || (() => null))(state) || state;
  }
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
