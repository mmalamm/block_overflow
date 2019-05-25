import React, { useState, useEffect } from "react";
import "./App.css";

import { mergeBoard } from "./tetris_rx/pieces";

import styles from "./App.module.css";

import store from "./tetris_rx/store";
import { interval } from "rxjs";



export default function App() {
  const [state, setState] = useState(store.getState());
  console.log(store.getState());
  useEffect(() => {
    store.subscribe(_ => setState(store.getState()));
    interval(200).subscribe(() => store.dispatch({ type: "TICK" }));
  }, []);

  const { board, playerPiece } = state;
  return (
    <div className={styles.App}>
      {mergeBoard(board, playerPiece).map((row, idx) => (
        <div className={styles.row} key={idx}>{idx}{
          row.split('').map((ltr, idx) => {
            return <div key={idx} className={styles.cell}>{ltr}</div>
          })
        }</div>
      ))}
    </div>
  );
}
