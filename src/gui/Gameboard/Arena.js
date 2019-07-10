import React from "react";
import styles from "./styles/Arena.module.css";
import { COLORS } from "../../tetris/pieces";
const Arena = ({ mergedBoard }) => (
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
export default Arena;
