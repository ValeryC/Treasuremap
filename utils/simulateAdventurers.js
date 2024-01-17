const moveForward = require("./moveForward");
const turn = require("./turn");

const simulateAdventurers = (map, adventurers) => {
  const adventurerResults = [];

  const simulate = (i) => {
    console.log('>>>inSimulate adventurers', adventurers);
    console.log('>>>i', i);
    if (i < adventurers.length) {
      let [name, x, y, orientation, movementSequence] = adventurers[i].map(
        (val) => (isNaN(val) ? val : parseInt(val))
      );
      let treasuresCollected = 0;
      console.log(">>>name", name); // Lara
      console.log(">>>x", x); // 1
      console.log(">>>y", y); // 1
      console.log(">>>movementSequence", movementSequence); // AADADAGGA
     
      console.log(`[${name}] Position avant simulation : (${x}, ${y})`);
      
      const processMove = (move) => {
        if (move === "A") {
          const [newX, newY] = moveForward(map, x, y, orientation);

          if (
            map[newY][newX] &&
            map[newY][newX].type === "T" &&
            map[newY][newX].count > 0
          ) {
              treasuresCollected += 1;
              map[newY][newX].count -= 1;
              console.log('>>>map[newY][newX].count ', map[newY][newX].count );
              console.log('>>>treasuresCollected', treasuresCollected);
          }

          x = newX;
          y = newY;
          console.log(">>>on the if => x", x);
          console.log(">>>on the if => y", y); 
        } else if (move === "G" || move === "D") {
          orientation = turn(orientation, move);
        }
      };

      movementSequence.split("").forEach(processMove);

      adventurerResults.push([name, x, y, orientation, treasuresCollected]);

      simulate(i + 1);
    }
  };

  simulate(0);
  return adventurerResults;
};

module.exports = simulateAdventurers;
