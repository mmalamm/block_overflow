import React, { useState, useEffect, useCallback } from "react";

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
  const [highScore, setHighScore] = useState(
    window.localStorage.getItem("highScore")
  );

  const { score, isStarted, level, upcomingPieces } = state;

  const startGame = useCallback(() => {
    tetris.start();
  }, [tetris]);

  const togglePause = useCallback(() => {
    setPaused(!isPaused);
    tetris.togglePause();
  }, [tetris, isPaused]);

  useEffect(() => {
    tetris.subscribe(state => {
      setState(state);
      setMergedBoard(ghostBoard(state));
      if (!state.isStarted) {
        if (state.score > highScore) {
          setHighScore(state.score);
        }
      }
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
  }, [isPaused, highScore, tetris, startGame, togglePause]);

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
        {highScore && (
          <h3 style={{ textAlign: "center" }}>High Score: {highScore}</h3>
        )}
      </div>
    );
  };
  const touchButton = direction => () => {
    tetris.touchButton(direction);
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
