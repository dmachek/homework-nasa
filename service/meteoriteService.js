const HttpClient = require('../util/httpClient');

class MeteoriteService {
    constructor() {
        this.apiUrl = process.env.API_URL;
    }

    async fetchMeteoriteData() {
        try {
            console.log(`Fetching meteorite data from ${this.apiUrl}...`.bgCyan);
            return await HttpClient.fetch(this.apiUrl).finally(() => {
                console.log(`Meteorite data fetched!`.bgGreen + "\n");
            }
        );
        } catch (error) {
            console.error(`Failed to fetch meteorite data: ${error}`.red);
            throw error;
        }
    }

    findMostMassiveMeteorite(meteorites) {
        return meteorites.reduce((max, meteorite) => {
            return (meteorite.mass && parseFloat(meteorite.mass) > parseFloat(max.mass)) ? meteorite : max;
        }, { mass: '0' });
    }

    findMostFrequentYear(meteorites) {
        const yearsFrequency = meteorites.reduce((acc, meteorite) => {
            let year = new Date(meteorite.year).getFullYear();
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        }, {});

        const maxFrequency = Math.max(...Object.values(yearsFrequency));
        const mostFrequentYears = Object.keys(yearsFrequency).filter(year => yearsFrequency[year] === maxFrequency);
        return mostFrequentYears;
    }
}

module.exports = MeteoriteService;
