const fs = require('fs');

const readInput = filename => {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return data.split('\n').filter(line => !line.startsWith('#')).map(line => line.trim());
    } catch (error) {
        console.error(`Erreur de lecture du fichier d'entrée: ${error.message}`);
        process.exit(1);
    }
};

const initializeMap = (width, height) => Array.from({ length: height }, () => Array(width).fill('.'));

const placeMountains = (map, mountains) => mountains.forEach(([x, y]) => map[y][x] = 'M');

const placeTreasures = (map, treasures) => treasures.forEach(([x, y, count]) => {
    if (map[y][x] === 'M') {
        // Ignore treasures on mountains
    } else if (map[y][x] && map[y][x].type === 'T') {
        // Add the count to the existing treasure
        map[y][x].count += count;
    } else {
        // Place a new treasure
        map[y][x] = { type: 'T', count };
    }
});

const moveForward = (map, x, y, orientation) => {
    const directions = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
    const [dx, dy] = directions[orientation];
    const newX = Math.max(0, Math.min(map[0].length - 1, x + dx));
    const newY = Math.max(0, Math.min(map.length - 1, y + dy));
    return [newX, newY];
};

const turn = (currentOrientation, direction) => {
    const directions = ['N', 'E', 'S', 'W'];
    const currentIndex = directions.indexOf(currentOrientation);
    const newIndex = (currentIndex + (direction === 'G' ? 3 : 1)) % 4;
    return directions[newIndex];
};

const simulateAdventurers = (map, adventurers) => {
    const adventurerResults = [];

    const simulate = i => {
        if (i < adventurers.length) {
            let [name, x, y, orientation, movementSequence] = adventurers[i].map(val => isNaN(val) ? val : parseInt(val));
            let treasuresCollected = 0;

            console.log(`[${name}] Position avant simulation : (${x}, ${y})`);

            const processMove = move => {
                if (move === 'A') {
                    const [newX, newY] = moveForward(map, x, y, orientation);

                    if (map[newY][newX] && map[newY][newX].type === 'T' && map[newY][newX].count > 0) {
                        treasuresCollected += 1;
                        map[newY][newX].count -= 1;
                        console.log(`[MoveForward] Position: (${newX}, ${newY}), Trésors restants : ${map[newY][newX].count}`);
                    }

                    x = newX;
                    y = newY;
                } else if (move === 'G' || move === 'D') {
                    orientation = turn(orientation, move);
                }
            };

            movementSequence.split('').forEach(processMove);

            console.log(`[${name}] Résultat final : (${x}, ${y}), Trésors ramassés : ${treasuresCollected}`);
            adventurerResults.push([name, x, y, orientation, treasuresCollected]);

            simulate(i + 1);
        }
    };

    simulate(0);
    return adventurerResults;
};

const writeOutput = (filename, map, treasures, adventurers) => {
    const output = [];

    output.push(`C - ${map[0].length} - ${map.length}`);

    map.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 'M') {
                output.push(`M - ${x} - ${y}`);
            } else if (cell && cell.type === 'T' && cell.count > 0) {
                output.push("# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}");
                output.push(`T - ${x} - ${y} - ${cell.count}`);
            }
        });
    });
    output.push("# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}");
    adventurers.forEach(adventurer => {
        const [name, x, y, orientation, treasuresCollected] = adventurer;
        output.push(`A - ${name} - ${x} - ${y} - ${orientation} - ${treasuresCollected}`);
    });

    try {
        fs.writeFileSync(filename, output.join('\n'), 'utf-8');
        console.log('Fichier de sortie écrit avec succès.');
    } catch (error) {
        console.error(`Erreur d'écriture du fichier de sortie: ${error.message}`);
        process.exit(1);
    }
};

const main = () => {
    const inputFileName = 'input.txt';
    const outputFileName = 'output.txt';

    const inputLines = readInput(inputFileName);

    const mapDimensions = inputLines[0].split(' - ').slice(1).map(Number);
    console.log('>>>mapDimensions', mapDimensions);
    const mapWidth = mapDimensions[0];
    const mapHeight = mapDimensions[1];
    const map = initializeMap(mapWidth, mapHeight);

    const mountainPositions = inputLines.filter(line => line.startsWith('M')).map(line => line.split(' - ').slice(1).map(Number));
    placeMountains(map, mountainPositions);
    console.log('>>>mountainPositions', mountainPositions);

    const treasurePositions = inputLines.filter(line => line.startsWith('T')).map(line => line.split(' - ').slice(1).map(Number));
    placeTreasures(map, treasurePositions);
    console.log('>>>treasurePositions', treasurePositions);

    const adventurerInfo = inputLines.filter(line => line.startsWith('A')).map(line => line.split(' - ').slice(1));
    console.log('>>>adventurerInfo', adventurerInfo);

    const adventurerResults = simulateAdventurers(map, adventurerInfo);
    console.log('>>>adventurerResults', adventurerResults);

    writeOutput(outputFileName, map, treasurePositions, adventurerResults);
};

main();
