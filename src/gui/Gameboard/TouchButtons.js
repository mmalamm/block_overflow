import React from "react";
import styles from "./TouchButtons.module.css";
const TouchButtons = ({ interactionType, touchButton }) => {
  const isTouchScreen = interactionType === "touch";
  return isTouchScreen ? (
    <div className={styles.buttonPanel}>
      <div className={`${styles.btnSet} ${styles.leftBtns}`}>
        <button
          className={`${styles.touchButton} ${styles.button_cw}`}
          onTouchStart={touchButton("CLOCKWISE")}
        >
          {"🔁"}
        </button>
      </div>

      <div className={`${styles.btnSet} ${styles.rightBtns}`}>
        <div className={`${styles.oneButtonWidth}`}>
          <button
            className={`${styles.touchButton} ${styles.button_up}`}
            onTouchStart={touchButton("UP")}
          >
            {"🔼"}
          </button>
        </div>

        <div className={`${styles.twoButtonWidth}`}>
          <button
            className={`${styles.touchButton} ${styles.button_left}`}
            onTouchStart={touchButton("LEFT")}
          >
            {"◀️"}
          </button>

          <button
            className={`${styles.touchButton} ${styles.button_right}`}
            onTouchStart={touchButton("RIGHT")}
          >
            {"▶️"}
          </button>
        </div>

        <div className={`${styles.oneButtonWidth}`}>
          <button
            className={`${styles.touchButton} ${styles.button_down}`}
            onTouchStart={touchButton("DOWN")}
          >
            {"🔽"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TouchButtons;
