const MeteoriteController = require('./controller/meteoriteController');
const colors = require('colors');
const dotenv = require('dotenv').config();

(async () => {
    const meteoriteController = new MeteoriteController();

    try {
        const stats = await meteoriteController.getMeteoriteStatistics();
        console.log('Meteorite stats fetched!'.bgGreen + '\n');
        meteoriteController.displayData(stats);
    } catch (error) {
        console.error(`Failed to get meteorite stats: ${error}`.red);
    }
})();
