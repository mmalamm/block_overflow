import createStore from "./store/createStore";

const SHIFT = "SHIFT";
const TICK = "TICK";
const RIGHT = "RIGHT";
const LEFT = "LEFT";
const DOWN = "DOWN";
const UP = "UP";
const ROTATE = "ROTATE";
const CLOCKWISE = "CLOCKWISE";
const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE";

const keyMapper = {
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
  }
};

class Tetris {
  constructor() {
    this.store = createStore();
  }
  subscribe(callback) {
    this.store.subscribe(_ => {
      callback(this.getState());
    });
  }
  getState() {
    return this.store.getState();
  }
  pressKey(e) {
    const action = keyMapper[e.keyCode];
    if (action) {
      this.store.dispatch(action);
    }
  }
  start() {
    setInterval(() => {
      this.store.dispatch({
        type: TICK
      });
    }, 500);
  }
}

export default Tetris;
