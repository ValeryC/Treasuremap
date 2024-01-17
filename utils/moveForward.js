const moveForward = (map, x, y, orientation) => {
    const directions = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
    const [dx, dy] = directions[orientation];
    const newX = Math.max(0, Math.min(map[0].length - 1, x + dx));
    console.log('>>>newX', newX);
    const newY = Math.max(0, Math.min(map.length - 1, y + dy));
    console.log('>>>newY', newY);
    return [newX, newY];
};

module.exports = moveForward