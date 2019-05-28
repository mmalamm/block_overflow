const compareCells = (bCell, sCell) =>
  bCell === "#"
    ? sCell !== "e"
      ? null
      : "#"
    : bCell !== "e" && sCell !== "e"
    ? null
    : bCell === "e" && sCell === "e"
    ? "e"
    : bCell === "e"
    ? sCell
    : bCell;

const diffSections = (boardSection, inputShape) => {
  const mergedSection = [];
  for (let y = 0; y < boardSection.length; y++) {
    const boardRow = boardSection[y];
    let row = "";
    for (let x = 0; x < boardRow.length; x++) {
      const boardCell = boardRow[x];
      const inputShapeCell = inputShape[y][x];
      const comparison = compareCells(boardCell, inputShapeCell);
      if (comparison === null) return null;
      row += comparison;
    }
    mergedSection.push(row);
  }
  return mergedSection;
};

export default diffSections;
