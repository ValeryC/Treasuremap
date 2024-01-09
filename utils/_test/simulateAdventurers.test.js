const simulateAdventurers = require('../simulateAdventurers');
// const placeTreasures = require('../utils/placeTreasures');


describe('simulateAdventurers', () => {
  it('should simulate adventurers correctly without collecting treasures', () => {
    const mockMap = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];

    const adventurers = [
      ['Adventurer1', 0, 0, 'N', 'A'],
    ];

    const expectedResults = [
      ['Adventurer1', 0, 0, 'N', 0],

    ];

    const result = simulateAdventurers(mockMap, adventurers);
    expect(result).toEqual(expectedResults);
  });

});
