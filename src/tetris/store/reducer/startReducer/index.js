import createInitialState from "../../../createInitialState";

export default state => {
  return {
    ...createInitialState(),
    isStarted: true
  };
};
