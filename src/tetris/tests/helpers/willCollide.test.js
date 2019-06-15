import { createEmptyBoard, getShape } from '../../helpers/utils';

import willCollide from "../../helpers/willCollide";

describe("willCollide tests", () => {
  it("will collide when piece at bottom of board", () => {
    const emptyBoard = createEmptyBoard();
    expect(
      willCollide(emptyBoard, { pieceName: "L", orientation: 0, x: 4, y: 17, offset: 0 })
    ).toBeFalsy();
  });
  it("will collide when piece overlaps with another piece", () => {
    const fixtureBoard = createEmptyBoard()
      .slice(0, 18)
      .concat([`eeeeeeleee`, `eeeellleee`]);
    const fixturePlayerPiece = {
      pieceName: "Z",
      x: 4,
      y: 16,
      offset: 0,
      orientation: 0
    };

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeTruthy();
  });
  
  it("when offset is 2 and is descending towards adjacent piece", () => {
    const fixtureBoard = [
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeesszee',
      'ejjjsszzej',
      'eoojelzssj',
      'eoolllssjj'
    ];
    const fixturePlayerPiece = {
      pieceName: 'I',
      x: 0,
      y: 13,
      orientation: 1,
      offset: 2
    };

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeFalsy();
  });
  it("when offset is 2 and is at the left side corner ready to be set", () => {
    const fixtureBoard = [
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeesszee',
      'ejjjsszzej',
      'eoojelzssj',
      'eoolllssjj'
    ];
    const fixturePlayerPiece = {
      pieceName: 'I',
      x: 0,
      y: 16,
      orientation: 1,
      offset: 2
    };

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeTruthy();
  });
  it("when offset is 2 and is moving past adjacent piece", () => {
    const fixtureBoard = [
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeesszee',
      'ejjjsszzej',
      'eoojelzssj',
      'eoolllssjj'
    ];
    const fixturePlayerPiece = {
      pieceName: 'I',
      x: 0,
      y: 14,
      orientation: 1,
      offset: 2
    };

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeFalsy();
  });
  it("when piece is 2 units away from bottom edge of shape", () => {
    const fixtureBoard = createEmptyBoard();
    const fixturePlayerPiece = {
      pieceName: "I",
      x: 4,
      y: 18,
      offset: 0,
      orientation: 0
    };

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeTruthy();
  });
  it("returns appropriately for offsetted pieces", () => {
    const fixtureBoard =[
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'eeeeeeeeee',
      'ejeeeeeese',
      'ejeeeeetss',
      'jjeeeettts'
    ];
    const fixturePlayerPiece = {
      pieceName: 'I',
      x: 2,
      y: 18,
      orientation: 0,
      offset: 0
    };

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeTruthy();
  });
  it("this should be true june14th", () => {
    const fixtureBoard =["eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","eeeeeeeeee","ooeezeeeee","ooezzeeeee","lllzteeeei","lsstteeeei","sszztejeli","ooszzejeli","lesizztssi","istlllejzi","tsslooezzi"];
    const fixturePlayerPiece = {pieceName: "S", x: 2, y: 10, orientation: 0, offset: 0};

    expect(willCollide(fixtureBoard, fixturePlayerPiece)).toBeTruthy();
  });
  
});
