import diffSections from "../../helpers/diffSections";

// diff sections takes in 2 arrays -- section of the board that the piece is trying to move into, and the currentShape

describe('diffSections tests', () => {
  test('returns merged grid when cells don\'t overlap', () => {
    const mockInputShape = [
      `ejj`,
      `eje`,
      `eje`
    ];
    
    const boardSection = [
      `iee`,
      `iez`,
      `iez`
    ]
    const expectedOutput = [
      `ijj`,
      `ijz`,
      `ijz`
    ]
    expect(diffSections(boardSection,
      mockInputShape)).toEqual(expectedOutput);
  })
  test('returns null when cells overlap', () => {
    const mockInputShape = [
      `lle`,
      `ele`,
      `ele`
    ];
    
    const boardSection = [
      `eee`,
      `eez`,
      `ezz`
    ]
    expect(diffSections(boardSection,
      mockInputShape)).toBeNull();
  })

  test('shape has empty column on right by right wall returns correct pattern', () => {
    const mockInputShape = [
      `lle`,
      `ele`,
      `ele`
    ];
    const boardSection = [
      `ee#`,
      `ee#`,
      `ee#`
    ];
    const expectedOutput = [
      `ll#`,
      `el#`,
      `el#`
    ]
    expect(diffSections(boardSection,
      mockInputShape)).toEqual(expectedOutput);
  })

  test('shape has empty column on left by left wall returns correct pattern', () => {
    const mockInputShape = [
      `ele`,
      `ele`,
      `ell`
    ];
    const boardSection = [
      `#ee`,
      `#ee`,
      `#ee`
    ];
    const expectedOutput = [
      `#le`,
      `#le`,
      `#ll`
    ]
    expect(diffSections(boardSection,
      mockInputShape)).toEqual(expectedOutput);
  })
})