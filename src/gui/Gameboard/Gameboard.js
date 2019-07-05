import React from "react";
import UpcomingPieces from "./UpcomingPieces";
import Arena from "./Arena";

import styles from "./Gameboard.module.css";

export default function Gameboard({
  upcomingPieces,
  mergedBoard,
  score,
  level
}) {
  const renderScoreAndLevel = () => {
    return (
      <div className={styles.scoreAndLevel}>
        <h2 className={styles.score}>score: {score}</h2>
        <h2 className={styles.level}>level: {level}</h2>
      </div>
    );
  };
  return (
    <div className={styles.gameBoard}>
      {renderScoreAndLevel()}
      <UpcomingPieces upcomingPieces={upcomingPieces.slice(-4)} />
      <Arena mergedBoard={mergedBoard} />
    </div>
  );
}
