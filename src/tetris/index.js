import createStore from "./store/createStore";
import { rotate } from "./store/reducer/rotateReducer";

const START = "START";
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
  constructor(initTimeoutLength) {
    this.initTimeoutLength = initTimeoutLength;
    this.store = createStore();

    ///
    window.store = this.store;
    ///

    this.currentTickTimeoutId = null;
    this.currentLevel = null;
    this.timeoutLength = null;
  }
  subscribe(callback) {
    this.store.subscribe(_ => {
      callback(this.getState());
    });
  }
  getState() {
    return this.store.getState();
  }
  isStarted() {
    const { isStarted } = this.store.getState();
    return isStarted;
  }
  canRotate(state, payload) {
    return !!rotate(state, payload);
  }
  pressKey(e) {
    if (!this.isStarted()) return;
    const action = keyMapper[e.keyCode];
    if (action) {
      this.store.dispatch(action);
      if (
        action.type === ROTATE &&
        this.canRotate(this.getState(), action.payload)
      ) {
        clearTimeout(this.currentTickTimeoutId);
        this.currentTickTimeoutId = setTimeout(this.tick, this.timeoutLength);
      }
    }
  }
  tick = () => {
    if (!this.isStarted()) return;
    this.store.dispatch({
      type: TICK
    });
    clearTimeout(this.currentTickTimeoutId);
    this.currentTickTimeoutId = setTimeout(this.tick, this.timeoutLength);
  };
  start() {
    this.store.dispatch({
      type: START
    });
    this.subscribe(state => {
      if (!state.isStarted) {
        clearTimeout(this.currentTickTimeoutId);
        return;
      }
      if (this.currentLevel !== state.level) {
        this.currentLevel = state.level;
        this.timeoutLength =
          this.initTimeoutLength * Math.pow(0.9, this.currentLevel);
      }
    });
    this.currentTickTimeoutId = setTimeout(this.tick, this.timeoutLength);
  }
}

export default Tetris;
