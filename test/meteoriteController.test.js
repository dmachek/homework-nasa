const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const MeteoriteController = require('../controller/meteoriteController');
const MeteoriteService = require('../service/meteoriteService');

describe('MeteoriteController', () => {
    let meteoriteController;
    let meteoriteServiceStub;

    beforeEach(() => {
        meteoriteController = new MeteoriteController();
        meteoriteServiceStub = sinon.stub(meteoriteController.meteoriteService);
    });

    describe('getMeteoriteStatistics', () => {
        it('should return the correct statistics', async () => {
            const mockData = [
                { name: 'Meteorite A', mass: '10', year: '1990-01-01T00:00:00.000' },
                { name: 'Meteorite B', mass: '20', year: '1991-01-01T00:00:00.000' },
                { name: 'Meteorite C', mass: '15', year: '1990-01-01T00:00:00.000' }
            ];
            meteoriteServiceStub.fetchMeteoriteData.resolves(mockData);
            meteoriteServiceStub.findMostMassiveMeteorite.returns({ name: 'Meteorite B', mass: '20' });
            meteoriteServiceStub.findMostFrequentYear.returns(['1990']);

            const result = await meteoriteController.getMeteoriteStatistics();
            expect(result.totalEntries).to.equal(3);
            expect(result.maxMeteorite.name).to.equal('Meteorite B');
            expect(result.mostFrequentYear).to.deep.equal(['1990']);
        });
    });

   describe('displayData', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        consoleSpy.restore();
    });

    it('should correctly format and display the statistics for a single most frequent year', () => {
        const stats = {
            totalEntries: 3,
            maxMeteorite: { name: 'Meteorite B', mass: '20' },
            mostFrequentYear: ['1990']
        };

        meteoriteController.displayData(stats);

        expect(consoleSpy.calledWith(`Total entries: `.green + `3`.bgMagenta)).to.be.true;
        expect(consoleSpy.calledWith(`Most massive meteorite: `.green + `Meteorite B `.bgMagenta + ` with mass `.green + `20`.bgMagenta)).to.be.true;
        expect(consoleSpy.calledWith(`Most frequent year: `.green + `1990`.bgMagenta)).to.be.true;
    });

    it('should correctly format and display the statistics for multiple most frequent years', () => {
        const stats = {
            totalEntries: 3,
            maxMeteorite: { name: 'Meteorite B', mass: '20' },
            mostFrequentYear: ['1990', '1991']
        };

        meteoriteController.displayData(stats);

        expect(consoleSpy.calledWith(`Total entries: `.green + `3`.bgMagenta)).to.be.true;
        expect(consoleSpy.calledWith(`Most massive meteorite: `.green + `Meteorite B `.bgMagenta + ` with mass `.green + `20`.bgMagenta)).to.be.true;
        expect(consoleSpy.calledWith(`Most frequent years: `.green + `1990, 1991`.bgMagenta)).to.be.true;
    });
});
});

