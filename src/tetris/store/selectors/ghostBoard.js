import { createSelector } from "reselect";
import ghostSelector from "./ghost";
import mergeBoardSelector from "./mergeBoard";
import insertGhostIntoBoard from "./insertGhostIntoBoard";

const ghostBoardSelector = createSelector(
  mergeBoardSelector,
  ghostSelector,
  insertGhostIntoBoard
);

export default ghostBoardSelector;
