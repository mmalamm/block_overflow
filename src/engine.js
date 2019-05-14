import { interval, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";

/**
 * currentPiece$: emits object with data about currentpiece
 * tick$: game tick- adds 1 to the y axis of currentpiece
 * keyPress$: depending on key, moves/rotates currentpiece
 * setPiece$: if currentPiece is at bottom of grid or colliding wiht a fixed piece, sets the currentPiece
 *
 * T Z S I O J L
 */
const e = 'e';
const PIECES = {
  T: {shape: [
    [],
    [],
    [],
  ]},
  Z: {},
  S: {},
  I: {},
  O: {},
  J: {},
  L: {}
};

const tick$ = interval(250);

const currentPiece$ = tick$.pipe(
  map(tick => {
    return { piece: "" };
  })
);
