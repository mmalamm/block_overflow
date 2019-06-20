import shiftLeft from "./shiftLeft";
import shiftRight from "./shiftRight";
import shiftDown from "./shiftDown";
import shiftUp from "./shiftUp";

const shiftFns = {
  LEFT: shiftLeft,
  RIGHT: shiftRight,
  DOWN: shiftDown,
  UP: shiftUp
};

export const shift = (state, payload) => {
  return shiftFns[payload](state);
};

const shiftReducer = (state, payload) => {
  return shift(state, payload) || state;
};

export default shiftReducer;
