import React, { useState, useEffect } from "react";
import "./App.css";

import { mergeBoard } from "./helpers";

import styles from "./App.module.css";

import { COLORS } from "./tetris/pieces";

import Tetris from "./tetris";

const emojis = {
  e: "◼",
  i: "🦋",
  j: "👖",
  l: "🍊",
  o: "🌝",
  s: "🍏",
  t: "🍆",
  z: "🍎",
  g: "⬛️"
};

const tetris = new Tetris();

export default function App() {
  const [state, setState] = useState(tetris.getState());
  useEffect(() => {
    tetris.subscribe(setState);
    document.addEventListener("keydown", e => {
      tetris.pressKey(e);
    });
  }, []);

  const renderGameboard = () => {
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
        <h2>{score}</h2>
      </div>
    );
  };

  const startGame = () => {
    tetris.start();
  };

  const { board, playerPiece, score, isStarted } = state;

  return isStarted ? (
    renderGameboard()
  ) : (
    <button onClick={startGame}>start game</button>
  );
}
