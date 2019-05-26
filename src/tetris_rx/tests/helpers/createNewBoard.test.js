import { createEmptyBoard, createNewBoard } from "../../helpers";
import { getShape } from "../../pieces";

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
});