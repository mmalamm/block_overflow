import PIECES from "../pieces";
import createBoardSection from "./createBoardSection";
import diffSections from "./diffSections";
import sequences from "../sequences";
import createNewBoard from "./createNewBoard";

export const createEmptyBoard = () => [...Array(20)].map(row => "e".repeat(10));

export const getShape = ({ pieceName, orientation, ghost }) => {
  const pieceShape = PIECES[pieceName].shapes[orientation];

  if (ghost) {
    const pieceCellContent = pieceName.toLowerCase();
    const regex = new RegExp(pieceCellContent, "g");
    return pieceShape.map(row => row.replace(regex, "g"));
  }
  return pieceShape;
};

export const checkIfIsOver = (brd, nextPce) => {
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

export const getNewLevel = (lvl, pcs) => (pcs.length ? lvl : lvl + 1);

export const getNewUpcomingPieces = (lvl, pcs) =>
  pcs.length ? pcs.slice() : [...sequences[lvl % 4].repeat(lvl + 1)];

const bonusMap = [0, 10, 25, 45, 70];

export const getNewScore = (currentScore, numRowsCleared, level) => {
  const clearBonus = bonusMap[numRowsCleared];
  const levelBonus = numRowsCleared * level * 10;
  const comboBonus = bonusMap[numRowsCleared] * level;
  const pointsScored = clearBonus + levelBonus + comboBonus;
  return currentScore + pointsScored;
};

export const getNewBoardAndNumRowsCleared = (board, playerPiece) => {
  const tickedBoard = createNewBoard(board, playerPiece);
  const clearedBoard = tickedBoard.filter(row => row.includes("e"));
  const numRowsCleared = 20 - clearedBoard.length;
  const newBoard = [
    ...[...Array(numRowsCleared)].map(_ => "e".repeat(10)),
    ...clearedBoard
  ];
  return [newBoard, numRowsCleared];
};
