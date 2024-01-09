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

module.exports = readInput;