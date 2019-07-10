import React from "react";
import styles from "./styles/ScoreAndLevel.module.css";

export default function ScoreAndLevel({ score, level }) {
  return (
    <div className={styles.scoreAndLevel}>
      <p className={styles.scoreLabel}>score:</p>
      <p className={styles.score}>{score}</p>
      <p className={styles.levelLabel}>lvl:</p>
      <p className={styles.level}>{level}</p>
    </div>
  );
}
