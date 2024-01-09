const initializeMap = (width, height) => Array.from({ length: height }, () => Array(width).fill('.'));

module.exports = initializeMap;