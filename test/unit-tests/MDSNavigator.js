const { expect } = require('chai');
const MDSNavigator= require('../../MDSNavigator/MDSNavigator');

describe('MDSCompanyNavigator', () => {
  describe('constructor', () => {
    it('should initialize when passed any token', () => {
      const token = 'test'
      const list = new MDSNavigator(token);

      expect(list.instance).to.be.not.undefined;
      expect(list.instance.defaults.headers.Authorization).to.be.equal(`Bearer ${token}`);
      expect(list.instance.defaults.baseURL).to.be.equal('https://mds.canalyst.com/api/');
      expect(list.instance.defaults.timeout).to.be.equal(20000);
  
    });

    it('throws an error when not passed a token', () => {
        try {
          new MDSNavigator();
        } catch (err) {
          expect(err).to.be.an('Error');
          expect(err.message).to.be.equal('Must pass API token as parameter in constructor.');
        }
    });
  });

  describe('getModelHistoricalData', () => {
    it('should throw an error when options do not contain either csin or ticker', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelHistoricalData();
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('Must include csin or ticker in parameters.');
      }
    });

    it('should throw an error when options.ticker.ticker is not defined', async () => {
        const nav = new MDSNavigator('test');
  
        try {
          await nav.getModelHistoricalData({
            csin: 'test',
            ticker: {
              tickerType: 'test',
            },
          });
        } catch (err) {
          expect(err).to.be.an('Error');
          expect(err.message).to.be.equal('ticker.ticker and ticker.tickerType must both be defined.');
        }
    });

    it('should throw an error when options.ticker.tickerType is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelHistoricalData({
          csin: 'test',
          ticker: {
            ticker: 'TEST',
          },
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('ticker.ticker and ticker.tickerType must both be defined.');
      }
  });
  });
});