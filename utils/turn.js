const turn = (currentOrientation, direction) => {
    const directions = ['N', 'E', 'S', 'W'];
    const currentIndex = directions.indexOf(currentOrientation);
  
    if (currentIndex === -1) {
      // Handle invalid currentOrientation
      return currentOrientation;
    }
  
    const newIndex = (currentIndex + (direction.toUpperCase() === 'G' ? 3 : 1)) % 4;
    return directions[newIndex];
  };
  
  module.exports = turn;
  