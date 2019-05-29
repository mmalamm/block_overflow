import { getShape } from './utils';
import diffSections from './diffSections';

const willCollide = (board, pce) => {
  const currentShape = getShape(pce), { x, y } = pce;
  if (y + currentShape.filter(row => row.replace(/e/g, "")).length > 19)
    return true;
  const len = currentShape.length;
  const squareOfNextTick = board
    .slice(y + 1, y + 1 + len)
    .map((row, idx) => row.slice(x, x + currentShape[idx].length));
  return !diffSections(squareOfNextTick, currentShape);
};

export default willCollide;