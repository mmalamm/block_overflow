import React from "react";
import ReactDOM from "react-dom";
import App from "./gui/App";
import Tetris from "./tetris";

const initTimeoutLength = 1000;
const tracker = window.gtag || (() => {});

const updateScore = score => {
  const currentScore = window.localStorage.getItem("highScore");
  if (!currentScore || +currentScore < score) {
    window.localStorage.setItem("highScore", score);
  }
};

const tetris = new Tetris(initTimeoutLength, tracker, updateScore);

ReactDOM.render(<App {...{ tetris }} />, document.getElementById("root"));
