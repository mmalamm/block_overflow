import React, { useState, useEffect } from "react";

import { createEmptyBoard } from "../tetris/helpers/utils";

import ghostBoard from "../tetris/store/selectors/ghostBoard";

import styles from "./App.module.css";

import Gameboard from "./Gameboard/Gameboard";
import TouchButtons from "./Gameboard/TouchButtons";
import ScoreAndLevel from "./Gameboard/ScoreAndLevel";

export default function App({ tetris }) {
  const [state, setState] = useState(tetris.getState());
  const [mergedBoard, setMergedBoard] = useState(createEmptyBoard());
  const [interactionType, setInteractionType] = useState("click");
  const [isPaused, setPaused] = useState(false);

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
      if (e.keyCode === 27 || e.keyCode === 80) {
        togglePause();
        return;
      }
      tetris.pressKey(e);
    };
    document.addEventListener("keydown", keydownCallback);
    return () => {
      document.removeEventListener("keydown", keydownCallback);
    };
  }, [isPaused]);

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
        <ScoreAndLevel {...{ score, level }} />
      </div>
    );
  };
  const touchButton = direction => () => {
    tetris.touchButton(direction);
  };
  const togglePause = () => {
    setPaused(!isPaused);
    tetris.togglePause();
  };
  return (
    <div className={styles.container}>
      {isStarted ? (
        <>
          <Gameboard
            {...{
              upcomingPieces,
              mergedBoard,
              score,
              level
            }}
          />
          <TouchButtons {...{ interactionType, touchButton, togglePause }} />
        </>
      ) : (
        renderHomeScreen()
      )}
    </div>
  );
}
