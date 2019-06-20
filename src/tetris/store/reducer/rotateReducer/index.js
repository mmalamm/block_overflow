import { rotateClockwise, rotateCounterClockwise } from "./rotate";

const rotateFns = {
  CLOCKWISE: rotateClockwise,
  COUNTER_CLOCKWISE: rotateCounterClockwise
};

export const rotate = (state, payload) => {
  return rotateFns[payload](state);
};

export default (state, payload) => {
  return rotate(state, payload) || state;
};
