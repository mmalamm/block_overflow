import { createEmptyBoard } from "./helpers/utils";

const { I, S, J, L, O, T, Z } = [..."IJLOSTZ"].reduce(
  (a, l) => ({ ...a, [l]: l }),
  {}
);

const createInitialState = () => {
  return {
    playerPiece: { pieceName: J, x: 4, y: 0, orientation: 3, offset: 0 },
    board: createEmptyBoard(),
    upcomingPieces: [T, I, S, J, O, Z, L]
      .join("")
      .repeat(100)
      .split(""),
    score: 0,
    isStarted: null
  };
};

export default createInitialState;
