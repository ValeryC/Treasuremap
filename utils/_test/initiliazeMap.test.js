const initializeMap = require('../initializeMap');

describe('initializeMap', () => {
  it('should create a map with the specified width and height filled with "."', () => {
    const width = 3;
    const height = 4;
    const map = initializeMap(width, height);

    // Check if the map has the correct dimensions
    expect(map.length).toBe(height);
    map.forEach(row => expect(row.length).toBe(width));

    // Check if each cell is initialized with "."
    map.forEach(row => row.forEach(cell => expect(cell).toBe('.')));
  });

  it('should create an empty map when width or height is 0', () => {
    const map1 = initializeMap(0, 5);
    const map2 = initializeMap(3, 0);
    const map3 = initializeMap(0, 0);
  
    expect(map1.length).toBe(0);
    expect(map2.length).toBe(0);
    expect(map3.length).toBe(0);
    expect(map1).toEqual([]);  // Additional check for empty map content
    expect(map2).toEqual([]);
    expect(map3).toEqual([]);
  });

  it('should create an empty map when width and height are 0', () => {
    const map = initializeMap(0, 0);
    expect(map.length).toBe(0);
  });
});
