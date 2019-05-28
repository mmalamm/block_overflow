const diffSections = (boardSection, inputShape) => {
  const len = inputShape.length;
  const output = [];
  for (let y = 0; y < len; y++) {
    let row = "";
    for (let x = 0; x < len; x++) {
      const boardCell = boardSection[y][x],
        inputShapeCell = inputShape[y][x];
      if (boardCell === "#") {
        if (inputShapeCell !== "e") {
          return null;
        }
        row += "#";
        continue;
      }
      if (boardCell !== "e" && inputShapeCell !== "e") {
        return null;
      }
      if (boardCell === "e" && inputShapeCell === "e") {
        row += "e";
        continue;
      }
      row += (boardCell === "e") ? inputShapeCell : boardCell;
    }
    output.push(row);
  }
  return output;
};

export default diffSections;
