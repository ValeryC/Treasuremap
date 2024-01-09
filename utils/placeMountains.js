const placeMountains = (map, mountains) => mountains.forEach(([x, y]) => map[y][x] = 'M');

module.exports = placeMountains