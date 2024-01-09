const moveForward = require('./moveForward');
const turn = require('./turn');

const simulateAdventurers = (map, adventurers) => {
    const adventurerResults = [];

    const simulate = i => {
        if (i < adventurers.length) {
            let [name, x, y, orientation, movementSequence] = adventurers[i].map(val => isNaN(val) ? val : parseInt(val));
            let treasuresCollected = 0;


            const processMove = move => {
                if (move === 'A') {
                    const [newX, newY] = moveForward(map, x, y, orientation);

                    if (map[newY][newX] && map[newY][newX].type === 'T' && map[newY][newX].count > 0) {
                        treasuresCollected += 1;
                        map[newY][newX].count -= 1;
                    }

                    x = newX;
                    y = newY;
                } else if (move === 'G' || move === 'D') {
                    orientation = turn(orientation, move);
                }
            };

            movementSequence.split('').forEach(processMove);

            adventurerResults.push([name, x, y, orientation, treasuresCollected]);

            simulate(i + 1);
        }
    };

    simulate(0);
    return adventurerResults;
};

module.exports = simulateAdventurers