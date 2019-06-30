import React, { useState, useEffect } from "react";

import { createEmptyBoard } from "../tetris/helpers/utils";

import ghostBoard from "../tetris/store/selectors/ghostBoard";

import styles from "./App.module.css";

import { COLORS } from "../tetris/pieces";

import Shape from "./Shape";

export default function App({ tetris }) {
  const [state, setState] = useState(tetris.getState());
  const [mergedBoard, setMergedBoard] = useState(createEmptyBoard());

  const { score, isStarted, level, upcomingPieces } = state;

  useEffect(() => {
    tetris.subscribe(state => {
      setState(state);
      setMergedBoard(ghostBoard(state));
    });
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

  const renderUpcomingPieces = () => (
    <div>
      <p>next:</p>
      <div className={styles.upcomingPieces}>
        {upcomingPieces.slice(-4).map((ltr, idx) => (
          <Shape key={idx} letter={ltr} />
        ))}
      </div>
    </div>
  );

  const renderGameboard = () => (
    <div className={styles.arena}>
      {mergedBoard.map((row, idx) => (
        <div className={styles.row} key={idx}>
          {[...row].map((ltr, idx) => (
            <div
              key={idx}
              className={styles.cell}
              style={{
                backgroundColor: COLORS[ltr]
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  const startGame = () => {
    tetris.start();
  };

  const renderHomeScreen = () => {
    return (
      <div className={styles.home}>
        <h2>Block Overflow !!</h2>
        <button onClick={startGame}>start game</button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {isStarted ? (
        <div>
          {renderUpcomingPieces()}
          {renderGameboard()}
        </div>
      ) : (
        renderHomeScreen()
      )}
      <h2 className={styles.score}>score: {score}</h2>
      <h2 className={styles.level}>level: {level}</h2>
    </div>
  );
}
