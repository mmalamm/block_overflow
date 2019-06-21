import {
  getNewLevel,
  getNewUpcomingPieces,
  getNewBoardAndNumRowsCleared,
  getNewScore,
  checkIfIsOver
} from "./utils";

export default state => {
  const { board, playerPiece, upcomingPieces, score, level } = state;
  const newLevel = getNewLevel(level, upcomingPieces);
  const newUpcomingPieces = getNewUpcomingPieces(level, upcomingPieces);
  const nextPieceName = newUpcomingPieces.pop();
  const [newBoard, numRowsCleared] = getNewBoardAndNumRowsCleared(
    board,
    playerPiece
  );
  const newScore = getNewScore(score, numRowsCleared, level);
  const nextPlayerPiece = {
    pieceName: nextPieceName,
    x: 4,
    y: 0,
    orientation: 0,
    offset: 0
  };

  const newState = {
    ...state,
    playerPiece: nextPlayerPiece,
    board: newBoard,
    upcomingPieces: newUpcomingPieces,
    score: newScore,
    level: newLevel
  };

  if (checkIfIsOver(newBoard, nextPlayerPiece)) {
    return {
      ...newState,
      isStarted: false
    };
  }
  return newState;
};
