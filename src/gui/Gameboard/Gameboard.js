import React from "react";
import UpcomingPieces from "./UpcomingPieces";
import Arena from "./Arena";
import TouchButtons from "./TouchButtons";

import styles from "./Gameboard.module.css";

export default function Gameboard({
  upcomingPieces,
  mergedBoard,
  interactionType,
  touchButton,
  score,
  level
}) {
  const renderScoreAndLevel = () => {
    return (
      <>
        <h2 className={styles.score}>score: {score}</h2>
        <h2 className={styles.level}>level: {level}</h2>
      </>
    );
  };
  return (
    <div className={styles.gameBoard}>
      <UpcomingPieces upcomingPieces={upcomingPieces.slice(-4)} />
      <Arena mergedBoard={mergedBoard} />
      <TouchButtons {...{ interactionType, touchButton }} />
      {renderScoreAndLevel()}
    </div>
  );
}
