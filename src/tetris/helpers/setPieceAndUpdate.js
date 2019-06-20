import createNewBoard from "./createNewBoard";
import createBoardSection from "./createBoardSection";
import { getShape } from "./utils";
import diffSections from "./diffSections";

const bonusMap = [0, 10, 25, 45, 70];

const checkIfIsOver = (brd, nextPce) => {
  const { offset, x, y } = nextPce;
  const currentShape = getShape(nextPce);
  const len = currentShape.length;
  const boardSection = createBoardSection(brd, {
    offset,
    x,
    y,
    length: len
  });
  return !diffSections(boardSection, currentShape);
};

const getNewLevel = (lvl, pcs) => (pcs.length ? lvl : lvl + 1);

export default state => {
  const { board, playerPiece, upcomingPieces, score, level } = state;
  const newLevel = getNewLevel(level, upcomingPieces);
  const newUpcomingPieces = upcomingPieces.slice();
  const nextPieceName = newUpcomingPieces.pop();

  const tickedBoard = createNewBoard(board, playerPiece);

  const clearedBoard = tickedBoard.filter(row => row.includes("e"));

  const numRowsCleared = 20 - clearedBoard.length;

  const newBoard = [
    ...[...Array(numRowsCleared)].map(_ => "e".repeat(10)),
    ...clearedBoard
  ];

  const newScore = score + bonusMap[numRowsCleared];

  const nextPlayerPiece = {
    pieceName: nextPieceName,
    x: 4,
    y: 0,
    orientation: 0,
    offset: 0
  };

  if (checkIfIsOver(newBoard, nextPlayerPiece)) {
    return {
      ...state,
      playerPiece: nextPlayerPiece,
      board: newBoard,
      upcomingPieces: newUpcomingPieces,
      score: newScore,
      level: newLevel,
      isStarted: false
    };
  }
  return {
    ...state,
    playerPiece: nextPlayerPiece,
    board: newBoard,
    upcomingPieces: newUpcomingPieces,
    score: newScore,
    isStarted: true,
    level: newLevel
  };
};
