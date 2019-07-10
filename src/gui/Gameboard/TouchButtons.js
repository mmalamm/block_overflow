import React from "react";
import styles from "./styles/TouchButtons.module.css";
const TouchButtons = ({ interactionType, touchButton, togglePause }) => {
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
        <button
          className={`${styles.touchButton} ${styles.button_pause}`}
          onTouchStart={togglePause}
        >
          {"⏯"}
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
