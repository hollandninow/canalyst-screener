const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const { checkModelVersion } = require('../../versionChecker/checkModelVersion');

describe('checkModelVersion', () => {
  it('should throw an error if neither options.csin nor options.canalystTicker are provided', async () => {
    try {
      await checkModelVersion( 'mdsToken', 'apiToken');
    } catch (err) {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('One of options.csin or options.canalystTicker must be defined.');
    }
  });

  it('should throw an error if mdsToken is not provided', async () => {
    try {
      await checkModelVersion( undefined, 'apiToken', {
        csin: 'test',
        canalystTicker: 'test',
      });
    } catch (err) {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('Must provide MDS token.');
    }
  });

  it('should throw an error if screener API token (apiToken) is not provided', async () => {
    try {
      await checkModelVersion( 'mdsToken', undefined, {
        csin: 'test',
        canalystTicker: 'test',
      });
    } catch (err) {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('Must provide token for screener API.');
    }
  });

  it('should return true if model version on database is the same as model version on MDS', async () => {

  });

  it('should return false if model version on database is NOT the same as model version on MDS', async () => {

  });
});