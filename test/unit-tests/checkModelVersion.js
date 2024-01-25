const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { expect } = require('chai');
const { checkModelVersion } = require('../../versionChecker/checkModelVersion');

describe('checkModelVersion', () => {
  it('should throw an error if neither options.csin nor options.ticker are provided', async () => {
    try {
      await checkModelVersion( 'mdsToken', 'apiToken');
    } catch (err) {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('One of options.csin or options.ticker must be defined.');
    }
  });

  it('should throw an error if mdsToken is not provided', async () => {
    try {
      await checkModelVersion( undefined, 'apiToken', {
        csin: 'test',
        ticker: 'TEST_US',
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
        ticker: 'TEST_US',
      });
    } catch (err) {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('Must provide token for screener API.');
    }
  });

  it('should return true if model version on database is the same as model version on MDS', async () => {
    const navigatorStub = {
      getLatestModelVersion: sinon.stub().resolves('mockedVersion'),
    }
    const axiosStub = sinon.stub();

    const { checkModelVersion } = proxyquire('../../versionChecker/checkModelVersion.js', {
      'axios': axiosStub,
      '../MDSNavigator/MDSNavigator': sinon.stub().returns(navigatorStub),
    });

    const axiosResponseData = {
      data: {
        data: {
          data: [
            {
              version: 'mockedVersion',
            }
          ]
        }
      }
    }

    axiosStub.resolves(axiosResponseData);

    const result = await checkModelVersion('mdsToken', 'apiToken', {
      csin: '12345',
    });

    sinon.assert.calledOnce(axiosStub);
    sinon.assert.calledWith(axiosStub, {
      method: 'GET',
      url: 'http://localhost:3000/api/v1/companies/?csin=12345',
      headers: {
        Authorization: 'Bearer apiToken'
      }
    });
    expect(result).to.be.true;
  });

  it('should return false if model version on database is NOT the same as model version on MDS', async () => {
    const navigatorStub = {
      getLatestModelVersion: sinon.stub().resolves('mockedVersion1'),
    }
    const axiosStub = sinon.stub();

    const { checkModelVersion } = proxyquire('../../versionChecker/checkModelVersion.js', {
      'axios': axiosStub,
      '../MDSNavigator/MDSNavigator': sinon.stub().returns(navigatorStub),
    });

    const axiosResponseData = {
      data: {
        data: {
          data: [
            {
              version: 'mockedVersion2',
            }
          ]
        }
      }
    }

    axiosStub.resolves(axiosResponseData);

    const result = await checkModelVersion('mdsToken', 'apiToken', {
      csin: '12345',
    });

    sinon.assert.calledOnce(axiosStub);
    sinon.assert.calledWith(axiosStub, {
      method: 'GET',
      url: 'http://localhost:3000/api/v1/companies/?csin=12345',
      headers: {
        Authorization: 'Bearer apiToken'
      }
    });
    expect(result).to.be.false;
  });
});