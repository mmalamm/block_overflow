import React, { useState, useEffect } from "react";

import { createEmptyBoard } from "../tetris/helpers/utils";

import ghostBoard from "../tetris/store/selectors/ghostBoard";

import styles from "./App.module.css";

import Gameboard from "./Gameboard/Gameboard";

export default function App({ tetris }) {
  const [state, setState] = useState(tetris.getState());
  const [mergedBoard, setMergedBoard] = useState(createEmptyBoard());
  const [interactionType, setInteractionType] = useState("click");

  const { score, isStarted, level, upcomingPieces } = state;

  useEffect(() => {
    tetris.subscribe(state => {
      console.log("got state");
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

  const startGame = () => {
    tetris.start();
  };

  const renderHomeScreen = () => {
    const touchScreenCallback = e => {
      e.preventDefault();
      setInteractionType("touch");
      startGame();
    };
    return (
      <div className={styles.home}>
        <h2>Block Overflow !!</h2>
        <button onClick={startGame} onTouchStart={touchScreenCallback}>
          start game
        </button>
        {renderScoreAndLevel()}
      </div>
    );
  };
  const touchButton = direction => () => {
    tetris.touchButton(direction);
  };
  const renderScoreAndLevel = () => {
    return (
      <>
        <h2 className={styles.score}>score: {score}</h2>
        <h2 className={styles.level}>level: {level}</h2>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {isStarted ? (
        <Gameboard
          {...{
            upcomingPieces,
            mergedBoard,
            interactionType,
            touchButton,
            score,
            level
          }}
        />
      ) : (
        renderHomeScreen()
      )}
    </div>
  );
}
