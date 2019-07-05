import React from "react";
import ReactDOM from "react-dom";
import App from "./gui/App";
import Tetris from "./tetris";

const initTimeoutLenght = 1000;
const tracker = window.gtag || (() => {});

const tetris = new Tetris(initTimeoutLenght, tracker);

ReactDOM.render(<App {...{ tetris }} />, document.getElementById("root"));
