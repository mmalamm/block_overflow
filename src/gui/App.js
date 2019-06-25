import React, { useState, useEffect } from "react";

import { mergeBoard } from "./helpers";

import styles from "./App.module.css";

import { COLORS } from "../tetris/pieces";

import Shape from "./Shape";

export default function App({ tetris }) {
  const [state, setState] = useState(tetris.getState());

  const { board, playerPiece, score, isStarted, level, upcomingPieces } = state;

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
      document.removeEventListener("keydown", keydownCallback);
    };
  }, []);

  const renderUpcomingPieces = pcs => (
    <div>
      <p>next:</p>
      <div className={styles.upcomingPieces}>
        {pcs.slice(-4).map((ltr, idx) => (
          <Shape key={idx} letter={ltr} />
        ))}
      </div>
    </div>
  );

  const renderGameboard = () => (
    <div className={styles.arena}>
      {mergeBoard(board, playerPiece).map((row, idx) => (
        <div className={styles.row} key={idx}>
          {row.split("").map((ltr, idx) => {
            return (
              <div
                key={idx}
                className={styles.cell}
                style={{
                  backgroundColor: COLORS[ltr]
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );

  const startGame = () => {
    tetris.start();
  };

  return (
    <div className={styles.container}>
      {isStarted ? (
        <div>
          {renderUpcomingPieces(upcomingPieces)}
          {renderGameboard()}
        </div>
      ) : (
        <button onClick={startGame}>start game</button>
      )}
      <h2 className={styles.score}>score: {score}</h2>
      <h2 className={styles.level}>level: {level}</h2>
    </div>
  );
}
