export const START = "START";
export const SHIFT = "SHIFT";
export const TICK = "TICK";
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const DOWN = "DOWN";
export const UP = "UP";
export const ROTATE = "ROTATE";
export const CLOCKWISE = "CLOCKWISE";
export const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE";

export const touchMapper = {
  LEFT: {
    type: SHIFT,
    payload: LEFT
  },
  RIGHT: {
    type: SHIFT,
    payload: RIGHT
  },
  UP: {
    type: SHIFT,
    payload: UP
  },
  DOWN: {
    type: SHIFT,
    payload: DOWN
  },
  SPACE: {
    type: ROTATE,
    payload: CLOCKWISE
  },
  CLOCKWISE: {
    type: ROTATE,
    payload: CLOCKWISE
  },
  COUNTER_CLOCKWISE: {
    type: ROTATE,
    payload: COUNTER_CLOCKWISE
  }
};

export const keyMapper = {
  39: {
    type: SHIFT,
    payload: RIGHT
  },
  37: {
    type: SHIFT,
    payload: LEFT
  },
  40: {
    type: SHIFT,
    payload: DOWN
  },
  38: {
    type: SHIFT,
    payload: UP
  },
  78: {
    type: ROTATE,
    payload: COUNTER_CLOCKWISE
  },
  77: {
    type: ROTATE,
    payload: CLOCKWISE
  },
  32: {
    type: ROTATE,
    payload: CLOCKWISE
  }
};
