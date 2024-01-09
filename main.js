const fs = require('fs');
// La déclaration const fs crée une variable nommée fs qui référence 
// maintenant les fonctionnalités fournies par le module fs. 
// Vous pouvez utiliser cette variable fs pour accéder aux méthodes exposées 
// par le module et effectuer des opérations liées au système de fichiers.

// La fonction require est utilisée en Node.js pour importer des modules. 
// Le paramètre passé à require est le nom du module que vous souhaitez importer. 
// Dans ce cas, 'fs' fait référence au module fs, qui est un module intégré à Node.js 
// et fournit des fonctionnalités pour lire et écrire des fichiers, manipuler des répertoires, 
// etc.

const readInput = filename => {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return data.split('\n').filter(line => !line.startsWith('#')).map(line => line.trim());
        // la ligne de code prend les données lues à partir d'un fichier, 
        // les divise en lignes, filtre les lignes commençant par '#', 
        // et supprime les espaces blancs inutiles autour de chaque ligne. 
        // Le résultat final est un tableau contenant les lignes pertinentes du fichier, 
        // prêtes à être utilisées dans d'autres parties de votre programme.
    } catch (error) {
        console.error(`Erreur de lecture du fichier d'entrée: ${error.message}`);
        process.exit(1);
        // Dans le contexte de votre code, si une erreur survient lors de la lecture du fichier 
        // d'entrée, la ligne process.exit(1); est exécutée. Cela indique que le processus 
        // Node.js doit se terminer avec un code de sortie égal à 1, ce qui est généralement 
        // utilisé pour signaler une erreur générique.
    }
};

const initializeMap = (width, height) => Array.from({ length: height }, () => Array(width).fill('.'));
// Cette approche utilise Array.from deux fois. La première pour créer les lignes (height), 
// et la deuxième pour créer les colonnes (width) à l'intérieur de chaque ligne.

const placeMountains = (map, mountains) => mountains.forEach(([x, y]) => map[y][x] = 'M');
// la fonction placeMountains prend un tableau bidimensionnel map et un tableau de coordonnées 
// mountains, puis place le caractère 'M' aux positions spécifiées par les coordonnées 
// mountains dans le tableau map. Cette fonction modifie directement le tableau existant, 
// et elle est utile pour placer des éléments 'M' ici, probablement des montagnes 
// sur la carte sans créer de nouveau tableau.

const placeTreasures = (map, treasures) => treasures.forEach(([x, y, count]) => {
    // Cette ligne utilise la méthode forEach sur le tableau treasures pour itérer 
    // sur chaque triplet de coordonnées [x, y, count]. La fonction fléchée (([x, y, count]) 
    // => { ... }) est appelée pour chaque triplet.
    if (map[y][x] === 'M') {
        // Si la position sur la carte (aux coordonnées [x, y]) est une montagne ('M'), 
        // le trésor est ignoré.
        //  Cela évite de placer des trésors sur des montagnes.
    } else if (map[y][x] && map[y][x].type === 'T') {
        // Sinon, si la position sur la carte contient déjà un trésor (map[y][x] 
        //  existe et a un type égal à 'T'), le nombre de trésors existants est mis à jour 
        //   en ajoutant le count du nouveau trésor.
        map[y][x].count += count;
    } else {
        // Sinon, s'il n'y a pas de montagne et qu'il n'y a pas déjà de trésor à cet emplacement,
        //  un nouveau trésor est placé sur la carte avec le type 'T' et le count spécifié.
        map[y][x] = { type: 'T', count };
    }
    // la fonction placeTreasures prend un tableau bidimensionnel map et 
    // un tableau de triplets de coordonnées treasures, puis place ou met à jour 
    // les trésors sur la carte en fonction des règles spécifiées. 
    // Cette fonction modifie directement le tableau existant en fonction 
    // des conditions spécifiées.
});

const moveForward = (map, x, y, orientation) => {
    // prend quatre paramètres : map (un tableau bidimensionnel représentant la carte), 
    // x et y (les coordonnées actuelles du personnage), et orientation 
    // (la direction dans laquelle le personnage fait face, représentée par une des lettres 
    //  N, S, E ou W pour nord, sud, est et ouest respectivement). 
    //  La fonction renvoie un nouveau couple de coordonnées représentant 
    //  la position du personnage après avoir avancé d'une unité dans la direction spécifiée.
    const directions = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
    // Cette ligne crée un objet directions qui associe chaque direction (N, S, E, W) 
    // à un tableau représentant le déplacement dans cette direction. 
    // Par exemple, si l'orientation est N (nord), le déplacement est de [0, -1], 
    // indiquant que le personnage doit se déplacer d'une unité vers le haut.
    const [dx, dy] = directions[orientation];
    // Cette ligne déstructure le tableau associé à l'orientation spécifiée, 
    // obtenant ainsi les composantes de déplacement 
    // (dx pour la composante horizontale,dy pour la composante verticale).
    const newX = Math.max(0, Math.min(map[0].length - 1, x + dx));
    // Cette ligne calcule la nouvelle coordonnée horizontale (newX) 
    // après le déplacement. Elle utilise Math.max et Math.min 
    // pour s'assurer que la nouvelle coordonnée reste dans les limites 
    // de la largeur de la carte. Si la nouvelle coordonnée calculée est inférieure à 0, 
    // elle est fixée à 0. Si elle est supérieure à la largeur de la carte moins 1, 
    // elle est fixée à la largeur de la carte moins 1.
    const newY = Math.max(0, Math.min(map.length - 1, y + dy));
    // Cette ligne calcule la nouvelle coordonnée verticale (newY) 
    // de manière similaire, en s'assurant que la nouvelle coordonnée 
    // reste dans les limites de la hauteur de la carte.
    return [newX, newY];
    // La fonction renvoie un tableau [newX, newY] représentant 
    // les nouvelles coordonnées après le déplacement.

    // la fonction moveForward prend en compte la direction actuelle 
    // du personnage et calcule les nouvelles coordonnées après un déplacement 
    // d'une unité dans cette direction, tout en veillant à rester 
    // dans les limites de la carte. 
    // Cela est particulièrement utile pour simuler le déplacement 
    // d'un personnage sur une carte dans un contexte de programmation 
    // de jeux ou de simulations.
};

const turn = (currentOrientation, direction) => {
//    Simule le changement d'orientation d'un objet 
//    en fonction de la direction spécifiée ('G' pour gauche, 'D' pour droite). 
    const directions = ['N', 'E', 'S', 'W'];
    // Cette ligne crée un tableau directions qui représente les quatre points cardinaux : 
    // Nord (N), Est (E), Sud (S), Ouest (W). 
    // L'ordre dans le tableau est important car il est utilisé pour déterminer 
    // les nouvelles orientations après un virage.
    const currentIndex = directions.indexOf(currentOrientation);
    // Cette ligne utilise la méthode indexOf pour trouver l'index de l'orientation 
    // actuelle (currentOrientation) dans le tableau directions. 
    // Cela donne l'indice de l'orientation actuelle dans le tableau.
    const newIndex = (currentIndex + (direction === 'G' ? 3 : 1)) % 4;
    // Cette ligne calcule le nouvel index après le virage. 
    // Si la direction est 'G' (gauche), 3 est ajouté à l'index actuel pour simuler un virage 
    // à gauche. Sinon, 1 est ajouté pour simuler un virage à droite. 
    // Le résultat est ensuite modulo 4 pour assurer que le nouvel index reste 
    // dans les limites du tableau (4 éléments). Cela simule le cycle circulaire 
    // entre les orientations Nord, Est, Sud et Ouest.
    console.log('>>>directions[newIndex]', directions[newIndex]);
    return directions[newIndex];
    // La fonction renvoie la nouvelle orientation obtenue 
    // à partir du tableau directions à l'indice newIndex. 
    // Cela représente la nouvelle direction après le virage.

    // la fonction turn prend l'orientation actuelle et 
    // la direction du virage en paramètres, puis retourne la nouvelle orientation 
    // après le virage. Elle utilise un tableau de directions pour déterminer 
    // les orientations possibles et effectue des calculs pour obtenir 
    // l'indice de la nouvelle orientation. Cette approche est souvent 
    // utilisée pour simuler des mouvements directionnels dans des applications ou jeux.
};

const simulateAdventurers = (map, adventurers) => {
    // prend deux paramètres : 
    // map (un tableau bidimensionnel représentant la carte) et 
    // adventurers (un tableau d'aventuriers avec leurs données initiales et 
    // séquences de mouvement). La fonction simule le déplacement des aventuriers sur la 
    // carte en suivant les séquences de mouvement spécifiées
    const adventurerResults = [];
    // Cette ligne initialise un tableau vide adventurerResults qui sera utilisé 
    // pour stocker les résultats de la simulation pour chaque aventurier.

    const simulate = i => {
    // Cette ligne déclare une fonction récursive simulate qui prend un indice i en paramètre. 
    // Cette fonction simule le déplacement de l'aventurier à l'indice i 
    // dans le tableau adventurers. 
    // La récursivité est utilisée pour traiter chaque aventurier de manière séquentielle.
        if (i < adventurers.length) {
    // Cette condition vérifie si l'indice i est inférieur à la longueur du tableau 
    // adventurers. Si c'est le cas, la simulation de l'aventurier à cet indice continue.
            let [name, x, y, orientation, movementSequence] = adventurers[i].map(val => isNaN(val) ? val : parseInt(val));
    // Cette ligne déstructure les données de l'aventurier à l'indice i dans 
    // le tableau adventurers. Elle convertit également les coordonnées x et y de chaînes de 
    // caractères en nombres.
            let treasuresCollected = 0;

            console.log(`[${name}] Position avant simulation : (${x}, ${y})`);

            const processMove = move => {
    // Cette ligne déclare une fonction processMove qui est utilisée pour traiter 
    // chaque mouvement dans la séquence de mouvement de l'aventurier.
    // On utilise la fonction moveForward pour les mouvements 'A' (avancer) et 
    // la fonction turn pour les mouvements 'G' (gauche) et 'D' (droite).
                if (move === 'A') {
                    const [newX, newY] = moveForward(map, x, y, orientation);

                    if (map[newY][newX] && map[newY][newX].type === 'T' && map[newY][newX].count > 0) {
                          // Si la case de destination est un trésor et qu'il en reste, on le collecte.
                        treasuresCollected += 1;
                        map[newY][newX].count -= 1;
                        console.log(`[MoveForward] Position: (${newX}, ${newY}), Trésors restants : ${map[newY][newX].count}`);
                    }

                    x = newX;
                    y = newY;
                } else if (move === 'G' || move === 'D') {
                     // Si le mouvement est une rotation (gauche ou droite), on utilise la fonction turn pour mettre à jour l'orientation.
                    orientation = turn(orientation, move);
                }
            };

            movementSequence.split('').forEach(processMove);
            // Cette ligne divise la séquence de mouvement en un tableau de caractères et 
            // utilise forEach pour appliquer 
            // la fonction processMove à chaque mouvement.
            console.log(`[${name}] Résultat final : (${x}, ${y}), Trésors ramassés : ${treasuresCollected}`);
            adventurerResults.push([name, x, y, orientation, treasuresCollected]);
            // Cette ligne ajoute un tableau contenant les résultats de la simulation de 
            // l'aventurier actuel au tableau adventurerResults.
            simulate(i + 1);
            // Cette ligne appelle récursivement la fonction simulate avec l'indice suivant pour passer 
            // à la simulation du prochain aventurier.
        }
    };

    simulate(0);
    // Cette ligne lance la simulation en appelant la fonction simulate avec l'indice initial 0.
    return adventurerResults;
    // La fonction renvoie le tableau adventurerResults contenant les résultats de 
    // la simulation pour chaque aventurier.

    // la fonction simulateAdventurers prend un tableau bidimensionnel map et un tableau 
    // d'aventuriers adventurers, puis simule le déplacement de chaque aventurier 
    // sur la carte en suivant les séquences de mouvement spécifiées. 
    // Les résultats de la simulation sont stockés dans un tableau et renvoyés.
};

const writeOutput = (filename, map, treasures, adventurers) => {
    // prend quatre paramètres : 
    // filename (le nom du fichier de sortie), 
    // map (le tableau bidimensionnel représentant la carte), 
    // treasures (un tableau de trésors sur la carte), et 
    // adventurers (un tableau d'aventuriers avec leurs résultats après simulation). 
    // La fonction génère une sortie au format spécifié et écrit cette sortie dans un fichier.
    const output = [];
    // Cette ligne initialise un tableau vide output qui sera utilisé 
    // pour stocker les lignes de sortie générées.

    output.push(`C - ${map[0].length} - ${map.length}`);
    // Cette ligne ajoute la première ligne de sortie qui spécifie les dimensions de la carte. 
    // On utilise la longueur de la première ligne (map[0].length) pour représenter 
    // la largeur et la longueur du tableau map pour représenter la hauteur.
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
//  Cette boucle parcourt chaque ligne de la carte (row) et chaque cellule de la ligne (cell). 
// On génère des lignes de sortie en fonction du contenu de chaque cellule.
// Si la cellule contient 'M', cela signifie qu'il y a une montagne à cette position, 
// et une ligne est ajoutée à la sortie pour le signaler.
// Si la cellule est un trésor (cell.type === 'T') et a un nombre de trésors restants 
// supérieur à 0, une ligne est ajoutée pour indiquer la position et le nombre de trésors restants.
    output.push("# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}");
    adventurers.forEach(adventurer => {
        const [name, x, y, orientation, treasuresCollected] = adventurer;
        output.push(`A - ${name} - ${x} - ${y} - ${orientation} - ${treasuresCollected}`);
    });
    // Cette boucle parcourt chaque aventurier dans le tableau adventurers. 
    // Pour chaque aventurier, une ligne est ajoutée à la sortie pour indiquer son nom, 
    // sa position, son orientation et le nombre de trésors ramassés.

    try {
        fs.writeFileSync(filename, output.join('\n'), 'utf-8');
        // Cette ligne utilise la méthode writeFileSync du module fs pour 
        // écrire la sortie générée dans un fichier. La sortie est convertie 
        // en une seule chaîne de texte en utilisant join('\n') 
        // pour séparer les lignes par des sauts de ligne.
        console.log('Fichier de sortie écrit avec succès.');
    } catch (error) {
        console.error(`Erreur d'écriture du fichier de sortie: ${error.message}`);
        process.exit(1);
        // Cette clause catch est utilisée pour gérer les erreurs éventuelles 
        // lors de l'écriture du fichier. En cas d'erreur, un message d'erreur est 
        // affiché dans la console, et le programme se termine avec le code d'erreur 1.
    }
};

const main = () => {
    // le point d'entrée du programme,script qui traite des données d'entrée,
    // simule les déplacements d'aventuriers sur une carte, et 
    // génère un fichier de sortie avec les résultats.
    const inputFileName = 'input.txt';
    const outputFileName = 'output.txt';

    const inputLines = readInput(inputFileName);
    // On spécifie le nom du fichier d'entrée (input.txt dans ce cas) et lit son contenu 
    // à l'aide de la fonction readInput. Les données d'entrée sont ensuite stockées dans 
    // le tableau inputLines, où chaque élément représente une ligne du fichier d'entrée
    const mapDimensions = inputLines[0].split(' - ').slice(1).map(Number);
    console.log('>>>mapDimensions', mapDimensions);
    const mapWidth = mapDimensions[0];
    const mapHeight = mapDimensions[1];
    const map = initializeMap(mapWidth, mapHeight);
    // On extrait les dimensions de la carte à partir de la première ligne de l'entrée, 
    // initialise la carte avec la largeur et la hauteur spécifiées en utilisant 
    // la fonction initializeMap, et stocke la carte dans la variable map.
    const mountainPositions = inputLines.filter(line => line.startsWith('M')).map(line => line.split(' - ').slice(1).map(Number));
    placeMountains(map, mountainPositions);
    // On extrait les positions des montagnes des lignes d'entrée, 
    // les convertit en valeurs numériques, puis place les montagnes 
    // sur la carte en utilisant la fonction placeMountains.
    console.log('>>>mountainPositions', mountainPositions);

    const treasurePositions = inputLines.filter(line => line.startsWith('T')).map(line => line.split(' - ').slice(1).map(Number));
    placeTreasures(map, treasurePositions);
    // On extrait les positions des trésors des lignes d'entrée, 
    // les convertit en valeurs numériques, puis place les trésors sur la carte 
    // en utilisant la fonction placeTreasures.
    console.log('>>>treasurePositions', treasurePositions);

    const adventurerInfo = inputLines.filter(line => line.startsWith('A')).map(line => line.split(' - ').slice(1));
    // On extrait les informations sur les aventuriers à partir des lignes 
    // d'entrée et les stocke dans le tableau adventurerInfo.
    console.log('>>>adventurerInfo', adventurerInfo);

    const adventurerResults = simulateAdventurers(map, adventurerInfo);
    // On utilise la fonction simulateAdventurers pour simuler les déplacements 
    // des aventuriers sur la carte en fonction des informations fournies. 
    // Les résultats de la simulation sont stockés dans le tableau adventurerResults.
    console.log('>>>adventurerResults', adventurerResults);
    
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

    writeOutput(outputFileName, map, treasurePositions, adventurerResults);
    // Cette fonction écrit la sortie dans un fichier (spécifié par output.txt dans ce cas) 
    // en utilisant la fonction writeOutput. 
    // La sortie inclut la carte, les positions des trésors et les résultats 
    // de la simulation des aventuriers.
};

main();
