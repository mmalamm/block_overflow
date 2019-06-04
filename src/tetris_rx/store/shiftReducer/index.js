import shiftLeft from './shiftLeft';
import shiftRight from './shiftRight';
import shiftDown from './shiftDown';
import shiftUp from './shiftUp';

const shiftFns = {
  LEFT: shiftLeft,
  RIGHT: shiftRight,
  DOWN: shiftDown,
  UP: shiftUp
};

const shiftReducer = (state, payload) => {
  return (shiftFns[payload] || (() => null))(state) || { ...state };
}

export default shiftReducer;