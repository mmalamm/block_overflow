import React, { useState, useEffect } from "react";
import "./App.css";

import { mergeBoard } from "./tetris_rx/helpers";

import styles from "./App.module.css";

import store from "./tetris_rx/store";
import { interval, fromEvent } from "rxjs";
import { COLORS } from "./tetris_rx/pieces";

window.store = store;

const emojis = {
  e: "e",
  i: "🦋",
  j: "👖",
  l: "🍊",
  o: "🌝",
  s: "🍏",
  t: "🍆",
  z: "🍎"
};

const SHIFT = 'SHIFT';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const DOWN = 'DOWN';
const UP = 'UP';
const ROTATE = 'ROTATE';
const CLOCKWISE = 'CLOCKWISE';
const COUNTER_CLOCKWISE = 'COUNTER_CLOCKWISE';

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
}

export default function App() {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(_ => setState(store.getState()));
    interval(750).subscribe(() => store.dispatch({ type: "TICK" }));
    fromEvent(document, "keydown").subscribe(e => {
      const action = keyMapper[e.keyCode];
      if (action) {
        store.dispatch(action)
      }
    });
  }, []);

  const { board, playerPiece } = state;
  return (
    <div className={styles.App}>
      <div className={styles.row}>
        {[...Array(10)].map((_, idx) => {
          return (
            <div key={idx} className={styles.cell}>
              {idx}
            </div>
          );
        })}
      </div>
      {mergeBoard(board, playerPiece).map((row, idx) => (
        <div className={styles.row} key={idx}>
          {row.split("").map((ltr, idx) => {
            return (
              <div
                key={idx}
                className={styles.cell}
                style={{ color: COLORS[ltr] }}
              >
                {emojis[ltr]}
              </div>
            );
          })}
          {idx}
        </div>
      ))}
    </div>
  );
}
