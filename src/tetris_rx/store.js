import { createStore } from "redux";

const { I, S, J, L, O, T, Z } = "IJLOSTZ"
  .split("")
  .reduce((a, l) => ({ ...a, [l]: l }));

const createInitalState = () => {
  return {
    currentPiece: { piece: L, x: 4, y: 0 },
    board: [...Array(20)].map(row => "e".repeat(10)),
    upcomingPieces: [T, I, S, J, O, Z],
    score: 0
  };
};

const initialState = createInitalState();

const reducers = {
  TICK: (state, payload) => {
    
  }
};

function tetrisReducer(state = initialState, { type, payload }) {
  return reducers[type] ? reducers[type](state, payload) : state;
}

export default createStore(tetrisReducer);
