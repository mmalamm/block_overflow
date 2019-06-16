import tickReducer from "./tickReducer";
import shiftReducer from "./shiftReducer";
import rotateReducer from "./rotateReducer/";

import createInitialState from '../../createInitialState';

const initialState = createInitialState();

const reducers = {
  TICK: tickReducer,
  SHIFT: shiftReducer,
  ROTATE: rotateReducer
};

export default function tetrisReducer(state = initialState, { type, payload }) {
  return reducers[type] ? reducers[type](state, payload) : state;
}