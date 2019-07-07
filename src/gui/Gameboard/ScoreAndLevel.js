import React from "react";
import styles from "./styles/ScoreAndLevel.module.css";

export default function ScoreAndLevel({ score, level }) {
  return (
    <div className={styles.scoreAndLevel}>
      <h2 className={styles.score}>score: {score}</h2>
      <h2 className={styles.level}>level: {level}</h2>
    </div>
  );
}
