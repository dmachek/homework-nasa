const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const MeteoriteService = require('../service/meteoriteService');
const HttpClient = require('../util/httpClient');

describe('MeteoriteService', () => {
    let meteoriteService;

    beforeEach(() => {
        meteoriteService = new MeteoriteService();
    });

    describe('findMostMassiveMeteorite', () => {
        it('should return the meteorite with the maximum mass', () => {
            const meteorites = [
                { name: 'Meteorite A', mass: '10' },
                { name: 'Meteorite B', mass: '20' },
                { name: 'Meteorite C', mass: '15' }
            ];
            const result = meteoriteService.findMostMassiveMeteorite(meteorites);
            expect(result.name).to.equal('Meteorite B');
        });

        it('should return text if there is a tie', () => {
            const meteorites = [
                { name: 'Meteorite A', mass: '20' },
                { name: 'Meteorite B', mass: '20' }
            ];
            const result = meteoriteService.findMostMassiveMeteorite(meteorites);
            expect(result).to.be.a('string');
        });
    });

    describe('findMostFrequentYear', () => {
        it('should return the most frequent year', () => {
            const meteorites = [
                { year: '1990-01-01T00:00:00.000' },
                { year: '1991-01-01T00:00:00.000' },
                { year: '1990-01-01T00:00:00.000' }
            ];
            const result = meteoriteService.findMostFrequentYear(meteorites);
            expect(result).to.deep.equal(['1990']);
        });

        it('should return all years with the maximum frequency in case of a tie', () => {
            const meteorites = [
                { year: '1990-01-01T00:00:00.000' },
                { year: '1991-01-01T00:00:00.000' },
                { year: '1990-01-01T00:00:00.000' },
                { year: '1991-01-01T00:00:00.000' }
            ];
            const result = meteoriteService.findMostFrequentYear(meteorites);
            expect(result).to.deep.equal(['1990', '1991']);
        });
    });

    describe('fetchMeteoriteData', () => {
        it('should fetch data from the API', async () => {
            const mockData = [{ name: 'Mock Meteorite', mass: '100' }];
            const stub = sinon.stub(HttpClient, 'fetch').resolves(mockData);

            const result = await meteoriteService.fetchMeteoriteData();
            expect(result).to.deep.equal(mockData);
            expect(stub.calledOnce).to.be.true;

            stub.restore();
        });
    });
});
