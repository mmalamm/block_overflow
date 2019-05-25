import React, { useState, useEffect } from "react";
import "./App.css";

import { mergeBoard } from "./tetris_rx/helpers";

import styles from "./App.module.css";

import store from "./tetris_rx/store";
import { interval, fromEvent } from "rxjs";
import { COLORS } from "./tetris_rx/pieces";

window.store = store;

export default function App() {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(_ => setState(store.getState()));
    interval(200).subscribe(() => store.dispatch({ type: "TICK" }));
    fromEvent(document, "keydown").subscribe(e =>
      store.dispatch({
        type: "SHIFT",
        payload: e.key.replace("Arrow", "").toUpperCase()
      })
    );
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
              <div key={idx} className={styles.cell} style={{ color: COLORS[ltr]}}>
                {ltr}
              </div>
            );
          })}
          {idx}
        </div>
      ))}
    </div>
  );
}
