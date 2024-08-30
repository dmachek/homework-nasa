const MeteoriteService = require('../service/meteoriteService');

class MeteoriteController {
    constructor() {
        this.meteoriteService = new MeteoriteService();
    }

    async getMeteoriteStatistics() {
        try {
            const meteorites = await this.meteoriteService.fetchMeteoriteData();
            
            const totalEntries = meteorites.length;
            const maxMeteorite = this.meteoriteService.findMostMassiveMeteorite(meteorites);
            const mostFrequentYear = this.meteoriteService.findMostFrequentYear(meteorites);

            return {
                totalEntries,
                maxMeteorite: { name: maxMeteorite.name, mass: maxMeteorite.mass },
                mostFrequentYear
            };
        } catch (error) {
            console.error('Error getting meteorite statistics:', error);
            throw error;
        }
    }

    displayData(stats) {
        console.log(`Total entries: `.green + `${stats.totalEntries}`.bgBlue);
        console.log(`Most massive meteorite: `.green + `${stats.maxMeteorite.name}`.bgBlue + ` with mass `.green + `${stats.maxMeteorite.mass}`.bgBlue);
        console.log(`Most frequent year(s): `.green + `${stats.mostFrequentYear.map(year => year)}`.bgBlue);
    }

}

module.exports = MeteoriteController;