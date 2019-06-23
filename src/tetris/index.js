import createStore from "./store/createStore";
import { rotate } from "./store/reducer/rotateReducer";
import { shift } from "./store/reducer/shiftReducer";

import { ROTATE, SHIFT, TICK, START, keyMapper } from "./constants";

class Tetris {
  constructor(initTimeoutLength) {
    this.initTimeoutLength = initTimeoutLength;
    this.store = createStore();
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
  canShift(state, payload) {
    return !!shift(state, payload);
  }
  pressKey(e) {
    const action = keyMapper[e.keyCode];
    if (action) {
      this.dispatch(action);
    }
  }

  dispatch(action) {
    if (!this.isStarted()) return;
    if (action) {
      const currentState = this.getState();
      if (
        (action.type === ROTATE &&
          this.canRotate(currentState, action.payload)) ||
        (action.type === SHIFT && this.canShift(currentState, action.payload))
      ) {
        this.store.dispatch(action);
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
          this.initTimeoutLength * Math.pow(0.8, this.currentLevel);
      }
    });
    this.currentTickTimeoutId = setTimeout(this.tick, this.timeoutLength);
  }
}

export default Tetris;
