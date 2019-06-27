const { I, S, J, L, O, T, Z } = [..."IJLOSTZ"].reduce(
  (a, l) => ({ ...a, [l]: l }),
  {}
);
const sequence = [
  T, I, S, J, O, Z, L,
  S, O, L, T, I, J, Z,
  L, J, O, Z, T, S, I,
  J, L, T, O, Z, I, S,
  O, Z, I, S, J, T, J,
];

export default sequence.join('');

const sequence = [
  'TISJOZL',
  'SOLTIJZ',
  'LJOZTSI',
  'JLTOZIS',
  'OZISJTJ',
];
const shuffler = arr => {
  for (let i = arr.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
  return arr
}
const shuffleLetters = str => shuffler([...str]).join('');

export default "TISJOZLSOLTIJZLJOZTSIJLTOZISOZISJTJ";