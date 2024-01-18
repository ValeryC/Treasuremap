const fs = require("fs");
const readInput = require("./utils/readInput");
const initializeMap = require("./utils/initializeMap");
const placeMountains = require("./utils/placeMountains");
const placeTreasures = require("./utils/placeTreasures");
const moveForward = require("./utils/moveForward");
const simulateAdventurers = require("./utils/simulateAdventurers");
const writeOutput = require("./utils/writeOutput");
const turn = require("./utils/turn");

const main = () => {
  const inputFileName = "input.txt";
  const outputFileName = "output.txt";

  const inputLines = readInput(inputFileName);
  
  const mapDimensions = inputLines[0].split(" - ").slice(1).map(Number);
  console.log('>>>mapDimensions', mapDimensions); // [3, 4]
  const mapWidth = mapDimensions[0];
  console.log('>>>mapWidth', mapWidth); // 3
  const mapHeight = mapDimensions[1];
  console.log('>>>mapHeight', mapHeight); // 4
  const map = initializeMap(mapWidth, mapHeight);
  console.log('>>>map', map); // [ [ '.', '.', '.' ], [ '.', '.', '.' ], [ '.', '.', '.' ], [ '.', '.', '.' ] ]
  const mountainPositions = inputLines
    .filter((line) => line.startsWith("M"))
    .map((line) => line.split(" - ").slice(1).map(Number));
  
console.log('>>>startWithM',inputLines
.filter((line) => line.startsWith("M"))
 ); // [ 'M - 1 - 0', 'M - 2 - 1' ]

console.log('>>>filtermap', inputLines
.filter((line) => line.startsWith("M"))
.map((line) => line.split(" - "))) // [ [ 'M', '1', '0' ], [ 'M', '2', '1' ] ]

console.log('>>>slice', inputLines
.filter((line) => line.startsWith("M"))
.map((line) => line.split(" - ").slice(1))) // [ [ '1', '0' ], [ '2', '1' ] ]

console.log('>>>mountainPositions', mountainPositions);
placeMountains(map, mountainPositions);
console.log('>>>placeMountains', placeMountains(map, mountainPositions)); 
// [ [ '.', 'M', '.' ], [ '.', '.', 'M' ], [ '.', '.', '.' ], [ '.', '.', '.' ] ]
  
  const treasurePositions = inputLines
    .filter((line) => line.startsWith("T"))
    .map((line) => line.split(" - ").slice(1).map(Number));

console.log('>>>inputLines filter', inputLines.filter((line) => line.startsWith("T")));
// [ 'T - 0 - 3 - 2', 'T - 1 - 3 - 3', 'T - 2 - 2 - 3' ]
   
  console.log('>>>split',inputLines
    .filter((line) => line.startsWith("T"))
    .map((line) => line.split(" - ")))  
// [ [ 'T', '0', '3', '2' ], [ 'T', '1', '3', '3' ], [ 'T', '2', '2', '3' ] ]
    console.log('>>>slice',inputLines
    .filter((line) => line.startsWith("T"))
    .map((line) => line.split(" - ").slice(1))) 
// [ [ '0', '3', '2' ], [ '1', '3', '3' ], [ '2', '2', '3' ] ]
    console.log('>>treasurePositions', treasurePositions) 
// [ [ 0, 3, 2 ], [ 1, 3, 3 ] ]

  placeTreasures(map, treasurePositions);

console.log('>>>map63', map); 
// [
//   [ '.', 'M', '.' ],
//   [ '.', '.', 'M' ],
//   [ '.', '.', '.' ],
//   [ { type: 'T', count: 2 }, { type: 'T', count: 3 }, '.' ]
// ]
  const adventurerInfo = inputLines
    .filter((line) => line.startsWith("A"))
    .map((line) => line.split(" - ").slice(1));

    console.log('>>>inputLines', inputLines.filter((line) => line.startsWith("A")));
    // [ 'A - Lara - 1 - 1 - S - AADADAGGA' ]
    console.log('>>>map slice', inputLines
    .filter((line) => line.startsWith("A"))
    .map((line) => line.split(" - ")));
    // [ [ 'A', 'Lara', '1', '1', 'S', 'AADADAGGA' ] ]
    console.log('>>>adventurerInfo', adventurerInfo);
    // [ [ 'Lara', '1', '1', 'S', 'AADADAGGA' ] ]
  const adventurerResults = simulateAdventurers(map, adventurerInfo);
 
  console.log('>>>adventurerResults ', adventurerResults );
  //  [ [ 'Lara', 0, 3, 'S', 3 ] ]
  console.log('--------')
  // display map on the console
  map.forEach((row, rowIndex) => {
    const rowString = row.map((cell, colIndex) => {
        if (adventurerResults.length > 0) {
            const [name, x, y] = adventurerResults[0];
            if (rowIndex === y && colIndex === x) {
                return 'A(Lara)';
            }
        }
        if (cell && cell.type === 'T' && cell.count > 0) {
            return `T(${cell.count})`;
        }
        return cell;
    });
    console.log(rowString.join(' '));
});

console.log('>>>map94', map);
// [
//   [ '.', 'M', '.' ],
//   [ '.', '.', 'M' ],
//   [ '.', '.', '.' ],
//   [ { type: 'T', count: 0 }, { type: 'T', count: 2 }, '.' ]
// ]
  writeOutput(outputFileName, map, treasurePositions, adventurerResults);
  // Fichier de sortie écrit avec succès.
};

main();
