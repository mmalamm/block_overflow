import PIECES from "../pieces";

export const createEmptyBoard = () => [...Array(20)].map(row => "e".repeat(10));

export const getShape = pce => PIECES[pce.pieceName].shapes[pce.orientation];

export const clearRows = board => board.filter(row => !row.includes('e'))
