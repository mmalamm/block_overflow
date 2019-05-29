const compareCells = (boardCell, shapeCell) =>
  boardCell === "#"
    ? shapeCell !== "e"
      ? null
      : "#"
    : boardCell !== "e" && shapeCell !== "e"
    ? null
    : boardCell === "e" && shapeCell === "e"
    ? "e"
    : boardCell === "e"
    ? shapeCell
    : boardCell;

const diffSections = (boardSection, inputShape) => {
  const mergedSection = [];
  for (let y = 0; y < boardSection.length; y++) {
    const boardRow = boardSection[y];
    let row = "";
    for (let x = 0; x < boardRow.length; x++) {
      const boardCell = boardRow[x],
        inputShapeCell = inputShape[y][x],
        comparison = compareCells(boardCell, inputShapeCell);
      if (comparison === null) return null;
      row += comparison;
    }
    mergedSection.push(row);
  }
  return mergedSection;
};

export default diffSections;
