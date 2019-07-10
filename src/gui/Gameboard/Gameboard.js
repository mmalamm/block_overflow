import React from "react";
import UpcomingPieces from "./UpcomingPieces";
import Arena from "./Arena";

import styles from "./styles/Gameboard.module.css";
import ScoreAndLevel from "./ScoreAndLevel";

export default function Gameboard({
  upcomingPieces,
  mergedBoard,
  score,
  level
}) {
  return (
    <div className={styles.gameBoard}>
      <UpcomingPieces upcomingPieces={upcomingPieces} />
      <Arena mergedBoard={mergedBoard} />
      <ScoreAndLevel {...{ score, level }} />
    </div>
  );
}
