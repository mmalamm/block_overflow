import React from "react";
import { getShape } from "../tetris/helpers/utils";
import styles from "./Shape.module.css";
import { COLORS } from "../tetris/pieces";

export default function Shape(props) {
  const shape = getShape({ pieceName: props.letter, orientation: 0 });
  return (
    <div className={styles.shape}>
      {shape.map((row, idx) => (
        <div className={styles.row} key={idx}>
          {[...row].map((ltr, idx) => {
            return (
              <div
                key={idx}
                className={styles.cell}
                style={{ backgroundColor: COLORS[ltr] }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
