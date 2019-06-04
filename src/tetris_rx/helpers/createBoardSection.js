const createBoardSection = (brd, { offset, x, y, length: len }) => {
  let boardSection;
  if (offset > 0) {
    boardSection = brd
      .slice(y, y + len)
      .map(row => "#".repeat(offset) + row.slice(0, len - offset));
  } else if (x + len > 10) {
    boardSection = brd.slice(y, y + len).map(row => {
      return row.slice(x) + "#".repeat(x + len - 10);
    });
  } else {
    boardSection = brd.slice(y, y + len).map(row => {
      return row.slice(x, x + len);
    });
  }
  while (boardSection.length < len) {
    boardSection.push("#".repeat(len));
  }
  return boardSection;
};

export default createBoardSection;
