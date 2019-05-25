import { createStore } from "redux";

import { willCollide, createNewBoard, createInitalState } from './helpers';


const initialState = createInitalState();

const reducers = {
  TICK: state => {
    console.log("TICK hit!!");
    const { board, playerPiece, upcomingPieces } = state;
    if (willCollide(board, playerPiece)) {
      const newUpcomingPieces = upcomingPieces.slice();
      const nextPiece = newUpcomingPieces.pop();
      return {
        ...state,
        playerPiece: { piece: nextPiece, x: 4, y: 0, orientation: 0 },
        board: createNewBoard(board, playerPiece),
        upcomingPieces: newUpcomingPieces
      };
    } else {
      return {
        ...state,
        playerPiece: { ...playerPiece, y: playerPiece.y + 1 }
      };
    }
  }
};

function tetrisReducer(state = initialState, { type, payload }) {
  return reducers[type] ? reducers[type](state, payload) : state;
}

export default createStore(tetrisReducer);
