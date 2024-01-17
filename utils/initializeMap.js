const initializeMap = (width, height) => {
    if (width <= 0 || height <= 0) {
      return [];
    }
  console.log('>>>', Array.from({ length: height }, () => Array(width).fill('.')) );
    return Array.from({ length: height }, () => Array(width).fill('.'));
  };
  
  module.exports = initializeMap;