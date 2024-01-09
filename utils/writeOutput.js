const fs = require('fs');
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

module.exports = writeOutput