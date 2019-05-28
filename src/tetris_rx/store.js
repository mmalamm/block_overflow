import { createStore } from "redux";

import willCollide from './helpers/willCollide';

import {
  // willCollide,
  createNewBoard,
  createInitalState,
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
    return (shiftFns[payload] || (() => null))(state) || { ...state };
  }
};

function tetrisReducer(state = initialState, { type, payload }) {
  return reducers[type] ? reducers[type](state, payload) : state;
}

export default createStore(tetrisReducer);
