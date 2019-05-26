import { createStore } from "redux";

import {
  willCollide,
  createNewBoard,
  createInitalState,
  // canShift
  shiftLeft,
  shiftRight,
  shiftDown
} from "./helpers";

const initialState = createInitalState();
const shiftFns = {
  LEFT: shiftLeft,
  RIGHT: shiftRight,
  DOWN: shiftDown
};

const reducers = {
  TICK: state => {
    const { board, playerPiece, upcomingPieces } = state;
    if (willCollide(board, playerPiece)) {
      const newUpcomingPieces = upcomingPieces.slice();
      const nextPieceName = newUpcomingPieces.pop();
      if (!nextPieceName) debugger;
      return {
        ...state,
        playerPiece: { pieceName: nextPieceName, x: 4, y: 0, orientation: 0 },
        board: createNewBoard(board, playerPiece),
        upcomingPieces: newUpcomingPieces
      };
    } else {
      return {
        ...state,
        playerPiece: { ...playerPiece, y: playerPiece.y + 1 }
      };
    }
  },
  SHIFT: (state, payload) => {
    /*
    const { board, playerPiece } = state;
    switch (payload) {
      case "LEFT":
        if (canShift("LEFT")(board, playerPiece)) {
          return {
            ...state,
            playerPiece: {
              ...playerPiece,
              x: playerPiece.x - 1
            }
          };
        } else {
          return { ...state };
        }
      case "RIGHT":
        if (canShift("RIGHT")(board, playerPiece)) {
          return {
            ...state,
            playerPiece: {
              ...playerPiece,
              x: playerPiece.x + 1
            }
          };
        } else {
          return { ...state };
        }
      case "DOWN":
        if (!willCollide(board, playerPiece)) {
          return {
            ...state,
            playerPiece: {
              ...playerPiece,
              y: playerPiece.y + 1
            }
          };
        } else {
          return { ...state };
        }
      default:
        return { ...state };
    }
    */
    return shiftFns[payload](state) || { ...state };
  }
};

function tetrisReducer(state = initialState, { type, payload }) {
  return reducers[type] ? reducers[type](state, payload) : state;
}

export default createStore(tetrisReducer);
