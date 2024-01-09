const fs = require('fs');
const readInput = require('./utils/readInput');
const initializeMap = require('./utils/initializeMap');
const placeMountains = require('./utils/placeMountains');
const placeTreasures = require('./utils/placeTreasures');
const moveForward = require('./utils/moveForward');
const simulateAdventurers = require('./utils/simulateAdventurers');
const writeOutput = require('./utils/writeOutput');
const turn = require('./utils/turn');

const main = () => {
    const inputFileName = 'input.txt';
    const outputFileName = 'output.txt';

    const inputLines = readInput(inputFileName);

    const mapDimensions = inputLines[0].split(' - ').slice(1).map(Number);
    const mapWidth = mapDimensions[0];
    const mapHeight = mapDimensions[1];
    const map = initializeMap(mapWidth, mapHeight);

    const mountainPositions = inputLines.filter(line => line.startsWith('M')).map(line => line.split(' - ').slice(1).map(Number));
    placeMountains(map, mountainPositions);

    const treasurePositions = inputLines.filter(line => line.startsWith('T')).map(line => line.split(' - ').slice(1).map(Number));
    placeTreasures(map, treasurePositions);

    const adventurerInfo = inputLines.filter(line => line.startsWith('A')).map(line => line.split(' - ').slice(1));

    const adventurerResults = simulateAdventurers(map, adventurerInfo);

    writeOutput(outputFileName, map, treasurePositions, adventurerResults);
};

main();
