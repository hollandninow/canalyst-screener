const sinon = require('sinon');
const { expect } = require('chai');
const proxyquire = require('proxyquire');
const fs = require('fs');
const MDSCompanyList = require('../../MDSNavigator/MDSCompanyList');
const { convertCSVToArray } = require('../../utils/convertCSVToArray');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

describe('MDSCompanyList', () => {
  describe('constructor', () => {
    describe('constructor', () => {
      it('should initialize when passed any token', () => {
        const token = 'test'
        const list = new MDSCompanyList(token);
  
        expect(list.instance).to.be.not.undefined;
        expect(list.instance.defaults.headers.Authorization).to.be.equal(`Bearer ${token}`);
        expect(list.instance.defaults.baseURL).to.be.equal('https://mds.canalyst.com/api/');
        expect(list.instance.defaults.timeout).to.be.equal(20000);
        expect(list.APIQueryURL).to.be.equal('companies/');
      });
  
      it('throws an error when not passed a token', () => {
          try {
            new MDSCompanyList();
          } catch (err) {
            expect(err).to.be.an('Error');
            expect(err.message).to.be.equal('Must pass API token as parameter in constructor.');
          }
      });
    });
  });

  describe('getCompanyList', () => {
    let axiosInstance, mdsCompanyList;

    beforeEach(() => {
      axiosInstance = {
        get: sinon.stub(),
      }

      const mockedAxios = {
        create: () => axiosInstance,
      }

      const MDSCompanyListProxy = proxyquire('../../MDSNavigator/MDSCompanyList', {
        axios: mockedAxios,
      });

      mdsCompanyList = new MDSCompanyListProxy('mockToken');
    });

    it('should return company list without sector', async () => {
      const responseData = fs.readFileSync(`${__dirname}/../test-data/companyListReinsurance.csv`, 'utf-8');
      const csv = convertCSVToArray(responseData);

      axiosInstance.get.resolves({
        data: responseData,
      });

      const res = await mdsCompanyList.getCompanyList();

      expect(res).to.deep.equal(csv);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal('companies/?format=csv&');
    });

    it('should retrieve data options.sector is a string', async () => {
      const responseData = fs.readFileSync(`${__dirname}/../test-data/companyListReinsurance.csv`, 'utf-8');
      const csv = convertCSVToArray(responseData);

      axiosInstance.get.resolves({
        data: responseData,
      });

      const sector = 'sectorString';

      const res = await mdsCompanyList.getCompanyList({
        sector
      });

      expect(res).to.deep.equal(csv);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`companies/?format=csv&sector=${sector}`);
    });

    it('should throw an error when options.sector is not a string', async () => {
      axiosInstance.get.resolves({
        data: true,
      });

      const sector = 123;
      try {
        await mdsCompanyList.getCompanyList({
          sector
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.sector must be of type String.');
      }
    });
  });
});