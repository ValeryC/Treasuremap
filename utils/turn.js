const turn = (currentOrientation, direction) => {
    const directions = ['N', 'E', 'S', 'W'];
    const currentIndex = directions.indexOf(currentOrientation);
    const newIndex = (currentIndex + (direction === 'G' ? 3 : 1)) % 4;
    return directions[newIndex];
};

module.exports = turn 