import { createEmptyBoard, createNewBoard, willCollide } from "../helpers";
import { getShape } from "../pieces";

it("will collide when piece at bottom of board", () => {
  const emptyBoard = createEmptyBoard();
  // let i = 0;
  for (let i = 0; i < 4; i++) {
    const yCoordinate =
      20 -
      getShape({ piece: "L", orientation: i }).filter(
        row => row.replace(/e/g, "").length
      ).length;
    const pieceAtBottom = {
      piece: "L",
      x: 4,
      y: yCoordinate,
      orientation: i
    };
    expect(willCollide(emptyBoard, pieceAtBottom)).toBeTruthy();
  }

  expect(
    willCollide(emptyBoard, { piece: "L", orientation: 0, x: 4, y: 17 })
  ).toBeFalsy();
});

it("will create new board when piece at bottom of board", () => {
  const emptyBoard = createEmptyBoard();
  const yCoordinate =
    20 -
    getShape({ piece: "L", orientation: 0 }).filter(
      row => row.replace(/e/g, "").length
    ).length;
  const pieceAtBottom = {
    piece: "L",
    x: 4,
    y: yCoordinate,
    orientation: 0
  };

  const expectedBoard = createEmptyBoard()
    .slice(0, yCoordinate)
    .concat([`eeeeeeleee`, `eeeellleee`]);

  expect(createNewBoard(emptyBoard, pieceAtBottom)).toEqual(expectedBoard);
});

it("will create new board when piece collides with another piece", () => {
  const pieceAtBottom = {
    piece: "Z",
    x: 4,
    y: 16,
    orientation: 0
  };

  const currentBoard = createEmptyBoard()
    .slice(0, 18)
    .concat([`eeeeeeleee`, `eeeellleee`]);

  const expectedBoard = createEmptyBoard()
    .slice(0, -4)
    .concat([`eeeezzeeee`, `eeeeezzeee`, `eeeeeeleee`, `eeeellleee`]);

  expect(createNewBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
});
