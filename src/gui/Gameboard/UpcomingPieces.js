import React from "react";
import styles from "./styles/UpcomingPieces.module.css";
import { COLORS } from "../../tetris/pieces";
import { getShape } from "../../tetris/helpers/utils";

function Shape(props) {
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


const UpcomingPieces = ({ upcomingPieces }) => (
  <div>
    <p>next:</p>
    <div className={styles.upcomingPieces}>
      {upcomingPieces.map((ltr, idx) => (
        <Shape key={idx} letter={ltr} />
      ))}
    </div>
  </div>
);

export default UpcomingPieces;
