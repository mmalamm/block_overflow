import React from "react";
import styles from "./styles/ScoreAndLevel.module.css";

export default function ScoreAndLevel({ score, level }) {
  return (
    <div className={styles.scoreAndLevel}>
      <h6 className={styles.scoreLabel}>score:</h6>
      <h5 className={styles.score}>{score}</h5>
      <h6 className={styles.levelLabel}>level:</h6>
      <h5 className={styles.level}>{level}</h5>
    </div>
  );
}
