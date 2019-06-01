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
  it("will create new board when piece has empty row at the bottom", () => {
    const pieceAtBottom = {
      pieceName: "S",
      x: 4,
      y: 18,
      orientation: 0
    };

    const currentBoard = createEmptyBoard()
      .slice(0, -4)
      .concat([...Array(4)].map(_ => `eeeeeeeeei`));

    const expectedBoard = createEmptyBoard()
      .slice(0, -4)
      .concat([`eeeeeeeeei`, `eeeeeeeeei`, `eeeeesseei`, `eeeesseeei`]);

    expect(createNewBoard(currentBoard, pieceAtBottom)).toEqual(expectedBoard);
  });
  it("weird case I'm trying to figure out", () => {
    const pieceToCollide = {
      pieceName: 'J',
      x: 0,
      y: 11,
      orientation: 1,
      offset: 1
    };

    const currentBoard = [
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeooeeeeee',
      'eeooelllee',
      'eetttlssee',
      'eootzsseee',
      'eoozzijjje',
      'essztillje',
      'sszttijlie',
      'izzstijlie',
      'izzssjjlie',
      'izztsoolie',
      'iztttoolle'
    ];

    const expectedBoard = [
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeooeeeeee',
      'eeooelllee',
      'jjtttlssee',
      'jootzsseee',
      'joozzijjje',
      'essztillje',
      'sszttijlie',
      'izzstijlie',
      'izzssjjlie',
      'izztsoolie',
      'iztttoolle'
    ];

    expect(createNewBoard(currentBoard, pieceToCollide)).toEqual(expectedBoard);
  });
});
