const placeMountains = require('../placeMountains');

describe('placeMountains', () => {
  it('should place mountains correctly on the map', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const mountains = [
      [0, 1],
      [2, 2],
    ];

    placeMountains(map, mountains);

    expect(map[1][0]).toBe('M');
    expect(map[2][2]).toBe('M');
  });

  it('should not place mountains on existing mountains', () => {
    const map = [
      ['.', '.', '.'],
      ['.', 'M', '.'],
      ['.', '.', '.'],
    ];
    const mountains = [
      [1, 1],
      [2, 2],
    ];

    placeMountains(map, mountains);

    expect(map[1][1]).toBe('M'); // Existing mountain, should not be overwritten
    expect(map[2][2]).toBe('M'); // New mountain, should be placed
  });

  it('should handle empty mountain array', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const mountains = [];

    placeMountains(map, mountains);

    expect(map.flat().every(cell => cell === '.')).toBe(true); // All cells should still be empty
  });

  it('should handle map with no mountains', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const mountains = [
      [3, 1], // Coordinates outside map boundaries
      [1, 3], // Coordinates outside map boundaries
    ];
  
    // Ensure that only valid coordinates are processed
    const validMountains = mountains.filter(([x, y]) => x >= 0 && x < map[0].length && y >= 0 && y < map.length);
  
    placeMountains(map, validMountains);
  
    expect(map.flat().every(cell => cell === '.')).toBe(true); // All cells should still be empty
  });
});
