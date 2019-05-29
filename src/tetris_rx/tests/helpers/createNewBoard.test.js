import { createEmptyBoard } from "../../helpers/utils";
import { getShape } from "../../helpers/utils";
import createNewBoard from "../../helpers/createNewBoard";

describe("createNewBoard scenarios", () => {
  it("will create new board when piece at bottom of board", () => {
    const emptyBoard = createEmptyBoard();
    const yCoordinate =
      20 -
      getShape({ pieceName: "L", orientation: 0 }).filter(
        row => row.replace(/e/g, "").length
      ).length;
    const pieceAtBottom = {
      pieceName: "L",
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
      pieceName: "Z",
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
  it("will create new board when piece is offsetted on right corner", () => {
    const pieceAtBottom = {
      pieceName: "J",
      x: 8,
      y: 17,
      orientation: 3
    };

    const currentBoard = createEmptyBoard();

    const expectedBoard = createEmptyBoard()
      .slice(0, -3)
      .concat([`eeeeeeeeej`, `eeeeeeeeej`, `eeeeeeeejj`]);

    expect(createNewBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
  });
});
