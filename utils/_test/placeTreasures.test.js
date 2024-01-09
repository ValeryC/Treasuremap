const placeTreasures = require('../placeTreasures');

describe('placeTreasures', () => {
  it('should place treasures correctly on the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const treasures = [
      [1, 1, 2],
      [2, 0, 1],
    ];

    placeTreasures(map, treasures);

    // Check if treasures are placed correctly
    expect(map[1][1]).toEqual({ type: 'T', count: 2 });
    expect(map[0][2]).toEqual({ type: 'T', count: 1 });
  });
  
  it('should add count to existing treasures', () => {
    const map = [
      ['.', '.', '.'],
      ['.', { type: 'T', count: 2 }, '.'],
      ['.', '.', '.'],
    ];
    const treasures = [
      [1, 1, 1], // Add to existing treasure
      [2, 0, 1],
    ];

    placeTreasures(map, treasures);

    // Check if count is added to the existing treasure
    expect(map[1][1]).toEqual({ type: 'T', count: 3 });
    expect(map[0][2]).toEqual({ type: 'T', count: 1 });
  });

  it('should place a new treasure when no existing treasure or mountain', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const treasures = [
      [1, 1, 2], // Place a new treasure
      [2, 0, 1],
    ];

    placeTreasures(map, treasures);

    // Check if a new treasure is placed
    expect(map[1][1]).toEqual({ type: 'T', count: 2 });
    expect(map[0][2]).toEqual({ type: 'T', count: 1 });
  });
});
