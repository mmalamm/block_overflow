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

let tetris = new Tetris(1000);

export default function App() {
  const [state, setState] = useState(tetris.getState());

  const { board, playerPiece, score, isStarted, level } = state;

  useEffect(() => {
    tetris.subscribe(setState);
    const keydownCallback = e => {
      if (e.key === "Enter" && !tetris.getState().isStarted) {
        startGame();
        return;
      }
      tetris.pressKey(e);
    };
    document.addEventListener("keydown", keydownCallback);
    return () => {
      tetris = null;
      document.removeEventListener("keydown", keydownCallback);
    };
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
        <h2 style={{ color: "green" }}>score: {score}</h2>
        <h2 style={{ color: "blue" }}>level {level}</h2>
      </div>
    );
  };

  const startGame = () => {
    tetris.start();
  };

  return isStarted ? (
    renderGameboard()
  ) : (
    <>
      <button onClick={startGame}>start game</button>
      <h2 style={{ color: "green" }}>score: {score}</h2>
      <h2 style={{ color: "blue" }}>level {level}</h2>
    </>
  );
}
