const placeTreasures = (map, treasures) => treasures.forEach(([x, y, count]) => {
if (map[y][x] && map[y][x].type === 'T') {
        // Add the count to the existing treasure
        map[y][x].count += count;
    } else {
        // Place a new treasure
        map[y][x] = { type: 'T', count };
    }
});

module.exports = placeTreasures