import { rotateClockwise, rotateCounterClockwise } from "./rotate";

const rotateFns = {
  CLOCKWISE: rotateClockwise,
  COUNTER_CLOCKWISE: rotateCounterClockwise
};

const rotateReducer = (state, payload) => {
  return (rotateFns[payload] || (() => null))(state) || state;
};

export default rotateReducer;
