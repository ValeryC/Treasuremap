const moveForward = require('../moveForward');

describe('moveForward', () => {
  it('should move forward correctly when facing North', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const [newX, newY] = moveForward(map, 1, 1, 'N');
    expect(newX).toBe(1);
    expect(newY).toBe(0);
  });

  it('should move forward correctly when facing South', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const [newX, newY] = moveForward(map, 1, 1, 'S');
    expect(newX).toBe(1);
    expect(newY).toBe(2);
  });

  it('should move forward correctly when facing East', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const [newX, newY] = moveForward(map, 1, 1, 'E');
    expect(newX).toBe(2);
    expect(newY).toBe(1);
  });

  it('should move forward correctly when facing West', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const [newX, newY] = moveForward(map, 1, 1, 'W');
    expect(newX).toBe(0);
    expect(newY).toBe(1);
  });

  it('should not move outside the map boundaries', () => {
    const map = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const [newX, newY] = moveForward(map, 0, 0, 'W');
    expect(newX).toBe(0);
    expect(newY).toBe(0);
  });
});
