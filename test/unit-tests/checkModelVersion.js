const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const { checkModelVersion } = require('../../versionChecker/checkModelVersion');

describe('checkModelVersion', () => {
  it('should throw an error if either options.csin or options.canalystTicker is not provided', async () => {

  });

  it('should throw an error if mdsToken is not provided', async () => {

  });

  it('should throw an error if screener API token (apiToken) is not provided', async () => {

  });

  it('should return true if model version on database is the same as model version on MDS', async () => {

  });

  it('should return false if model version on database is NOT the same as model version on MDS', async () => {

  });
});