import { getShape } from './utils';
import diffSections from './diffSections';

const willCollide = (board, pce) => {
  const currentShape = getShape(pce);
  if (pce.y + currentShape.filter(row => row.replace(/e/g, "")).length > 19)
    return true;
  const len = currentShape.length;
  const squareOfNextTick = board
    .slice(pce.y + 1, pce.y + 1 + len)
    .map((row, idx) => row.slice(pce.x, pce.x + currentShape[idx].length));
  return !diffSections(squareOfNextTick, currentShape);
};

export default willCollide;