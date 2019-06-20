import { createEmptyBoard } from "./helpers/utils";
import sequences from "./sequences";

const createInitialState = () => {
  const upcomingPieces = sequences[0].repeat(2).split("");
  const firstPieceName = upcomingPieces.pop();
  return {
    playerPiece: {
      pieceName: firstPieceName,
      x: 4,
      y: 0,
      orientation: 0,
      offset: 0
    },
    board: createEmptyBoard(),
    upcomingPieces,
    score: 0,
    isStarted: null,
    level: 0
  };
};

export default createInitialState;
