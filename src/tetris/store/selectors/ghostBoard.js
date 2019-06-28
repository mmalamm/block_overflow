import { createSelector } from "reselect";
import ghostSelector from "./ghost";
import { boardSelector, insertPieceIntoBoard } from "./shared";

const ghostBoardSelector = createSelector(
  boardSelector,
  ghostSelector,
  insertPieceIntoBoard
);

export default ghostBoardSelector;