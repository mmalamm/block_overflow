import createStore from "./store/createStore";

import { TICK, START, keyMapper, touchMapper } from "./constants";

class Tetris {
  constructor(initIntervalLength, tracker) {
    this.initIntervalLength = initIntervalLength;
    this.store = createStore();
    this.currentIntervalId = null;
    this.currentLevel = null;
    this.intervalLength = null;
    this.tracker = tracker;
  }
  subscribe(callback) {
    const unsubscribe = this.store.subscribe(_ => {
      const state = this.store.getState();
      const { upcomingPieces } = state;
      callback({ ...state, upcomingPieces: upcomingPieces.slice(-4) });
    });
    return unsubscribe;
  }
  getState() {
    return this.store.getState();
  }
  isStarted() {
    const { isStarted } = this.store.getState();
    return isStarted;
  }
  togglePause() {
    if (this.currentIntervalId) {
      clearInterval(this.currentIntervalId);
      this.currentIntervalId = null;
    } else {
      this.tick();
      this.currentIntervalId = setInterval(this.tick, this.intervalLength);
    }
  }
  pressKey(e) {
    const action = keyMapper[e.keyCode];
    if (action) {
      this.dispatch(action);
    }
  }
  touchButton(btn) {
    const action = touchMapper[btn];
    if (action) {
      this.dispatch(action);
    }
  }
  dispatch(action) {
    if (!this.currentIntervalId) return;
    if (!this.isStarted()) return;
    this.store.dispatch(action);
  }
  tick = () => {
    if (!this.isStarted()) return;
    this.store.dispatch({
      type: TICK
    });
  };
  start() {
    this.tracker("event", "start_game", {
      event_category: "button_press",
      event_label: "start_game"
    });
    this.store.dispatch({
      type: START
    });
    const unsubscribe = this.store.subscribe(_ => {
      const state = this.getState();
      if (!state.isStarted) {
        clearInterval(this.currentIntervalId);
        this.currentIntervalId = null;
        this.tracker("event", "game_ended", {
          event_category: "game_ended",
          event_label: "game_end_score",
          value: state.score
        });
        unsubscribe();
        return;
      }
      if (this.currentLevel !== state.level) {
        clearInterval(this.currentIntervalId);
        this.currentLevel = state.level;
        this.intervalLength =
          this.initIntervalLength * Math.pow(0.8, this.currentLevel);
        this.currentIntervalId = setInterval(this.tick, this.intervalLength);
      }
    });
    this.currentIntervalId = setInterval(this.tick, this.initIntervalLength);
  }
}

export default Tetris;
