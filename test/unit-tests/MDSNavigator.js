const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const fs = require('fs');
const MDSNavigator= require('../../MDSNavigator/MDSNavigator');
const { convertCSVToArray } = require('../../utils/convertCSVToArray');

describe('MDSCompanyNavigator', () => {
  describe('constructor', () => {
    it('should initialize when passed any token', () => {
      const token = 'test'
      const nav = new MDSNavigator(token);

      expect(nav.instance).to.be.not.undefined;
      expect(nav.instance.defaults.headers.Authorization).to.be.equal(`Bearer ${token}`);
      expect(nav.instance.defaults.baseURL).to.be.equal('https://mds.canalyst.com/api/');
      expect(nav.instance.defaults.timeout).to.be.equal(20000);
  
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

  describe('getModelData', () => {
    it('should throw an error when options.dataType is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelData({
          dataType: undefined,
          csin: undefined,
          ticker: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.dataType must be \'historical\' or \'forecast\'.');
      }
    });

    it('should throw an error when both options.csin or options.ticker are not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelData({
          dataType: 'historical',
          csin: undefined,
          ticker: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('One of options.csin or options.ticker must be defined.');
      }
    });

    it('should retrieve data if provided options.csin and options.dataType=historical', async () => {
      const axiosInstance = {
        get: sinon.stub(),
      };

      const mockedAxios = {
        create: () => axiosInstance,
      };

      const MDSNavigatorProxy = proxyquire('../../MDSNavigator/MDSNavigator.js', {
        axios: mockedAxios,
      });

      const navigator = new MDSNavigatorProxy('mockToken');

      const responseData = fs.readFileSync(`${__dirname}/../test-data/companyListReinsurance.csv`, 'utf-8');
      const csv = convertCSVToArray(responseData);

      axiosInstance.get.resolves({
        data: responseData,
      });

      const csin = 'testCSIN';
      const dataType = 'historical';

      const res = await navigator.getModelData({
        dataType,
        csin,
      });

      expect(res).to.deep.equal(csv);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`equity-model-series/${csin}/equity-models/latest/bulk-data/${dataType}-data.csv`);
    });

    it('should retrieve data if provided options.csin and options.dataType=forecast', async () => {
      const axiosInstance = {
        get: sinon.stub(),
      };

      const mockedAxios = {
        create: () => axiosInstance,
      };

      const MDSNavigatorProxy = proxyquire('../../MDSNavigator/MDSNavigator.js', {
        axios: mockedAxios,
      });

      const navigator = new MDSNavigatorProxy('mockToken');

      const responseData = fs.readFileSync(`${__dirname}/../test-data/companyListReinsurance.csv`, 'utf-8');
      const csv = convertCSVToArray(responseData);

      axiosInstance.get.resolves({
        data: responseData,
      });

      const csin = 'testCSIN';
      const dataType = 'forecast';

      const res = await navigator.getModelData({
        dataType,
        csin,
      });

      expect(res).to.deep.equal(csv);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`equity-model-series/${csin}/equity-models/latest/bulk-data/${dataType}-data.csv`);
    });

    it('should retrieve data if provided options.ticker and options.dataType=historical', async () => {
      const axiosInstance = {
        get: sinon.stub(),
      };

      const mockedAxios = {
        create: () => axiosInstance,
      };

      const MDSNavigatorProxy = proxyquire('../../MDSNavigator/MDSNavigator.js', {
        axios: mockedAxios,
      });

      const navigator = new MDSNavigatorProxy('mockToken');

      const responseData = fs.readFileSync(`${__dirname}/../test-data/companyListReinsurance.csv`, 'utf-8');
      const csv = convertCSVToArray(responseData);

      axiosInstance.get.resolves({
        data: responseData,
      });

      const ticker = 'testTicker';
      const dataType = 'historical';

      const res = await navigator.getModelData({
        dataType,
        ticker,
      });

      expect(res).to.deep.equal(csv);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`equity-model-series/${ticker}/equity-models/latest/bulk-data/${dataType}-data.csv`);
    });

    it('should retrieve data if provided options.ticker and options.dataType=historical', async () => {
      const axiosInstance = {
        get: sinon.stub(),
      };

      const mockedAxios = {
        create: () => axiosInstance,
      };

      const MDSNavigatorProxy = proxyquire('../../MDSNavigator/MDSNavigator.js', {
        axios: mockedAxios,
      });

      const navigator = new MDSNavigatorProxy('mockToken');

      const responseData = fs.readFileSync(`${__dirname}/../test-data/companyListReinsurance.csv`, 'utf-8');
      const csv = convertCSVToArray(responseData);

      axiosInstance.get.resolves({
        data: responseData,
      });

      const ticker = 'testTicker';
      const dataType = 'forecast';

      const res = await navigator.getModelData({
        dataType,
        ticker,
      });

      expect(res).to.deep.equal(csv);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`equity-model-series/${ticker}/equity-models/latest/bulk-data/${dataType}-data.csv`);
    });
  });

  describe('getLatestModelVersion', () => {
    it('should throw an error when both options.csin or options.ticker are not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getLatestModelVersion({
          csin: undefined,
          ticker: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('One of options.csin or options.ticker must be defined.');
      }
    });

    it('should retrieve model version when provided options.ticker', async () => {
      const axiosInstance = {
        get: sinon.stub(),
      };

      const mockedAxios = {
        create: () => axiosInstance,
      };

      const MDSNavigatorProxy = proxyquire('../../MDSNavigator/MDSNavigator.js', {
        axios: mockedAxios,
      });

      
      const navigator = new MDSNavigatorProxy('mockToken');
      
      const responseData = {
        latest_equity_model: {
          model_version: {
            name: 'testModelVersion',
          }
        }
      };
      
      axiosInstance.get.resolves({
        data: responseData,
      });

      const ticker = 'testTicker';
      
      const res = await navigator.getLatestModelVersion({
        ticker,
      });
      
      expect(res).to.equal(responseData.latest_equity_model.model_version.name);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`equity-model-series/${ticker}`);
    });

    it('should retrieve model version when provided options.csin', async () => {
      const axiosInstance = {
        get: sinon.stub(),
      };

      const mockedAxios = {
        create: () => axiosInstance,
      };

      const MDSNavigatorProxy = proxyquire('../../MDSNavigator/MDSNavigator.js', {
        axios: mockedAxios,
      });

      
      const navigator = new MDSNavigatorProxy('mockToken');
      
      const responseData = {
        latest_equity_model: {
          model_version: {
            name: 'testModelVersion',
          }
        }
      };
      
      axiosInstance.get.resolves({
        data: responseData,
      });

      const csin = 'testCSIN';
      
      const res = await navigator.getLatestModelVersion({
        csin,
      });
      
      expect(res).to.equal(responseData.latest_equity_model.model_version.name);
      expect(axiosInstance.get.calledOnce).to.be.true;
      expect(axiosInstance.get.firstCall.args[0]).to.equal(`equity-model-series/${csin}`);
    })
  });

  describe('getModelDataPoint', () => {
    it('should throw an error when both options.csin or options.ticker are not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelDataPoint({
          csin: undefined,
          ticker: undefined,
          periodType: undefined,
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('One of options.csin or options.ticker must be defined.');
      }
    });

    it('should throw an error when options.periodType is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: undefined,
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.periodType must be \'historical\' or \'forecast\'.');
      }
    });

    it('should throw an error when options.periodType is defined, but not historical or forecast', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: 'fail',
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.periodType must be \'historical\' or \'forecast\'.');
      }
    });

    it('should throw an error if options.periodString is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: 'forecast',
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.periodString must be provided.');
      }
    });

    it('should throw an error if options.timeSeriesName is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: 'forecast',
          periodString: 'Q3-2023',
          timeSeriesName: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.timeSeriesName must be provided.');
      }
    });
  });

  describe('getModelLTMDataPoint', () => {
    it('should throw an error when both options.csin or options.ticker are not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelLTMDataPoint({
          csin: undefined,
          ticker: undefined,
          periodType: undefined,
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('One of options.csin or options.ticker must be defined.');
      }
    });

    it('should throw an error when options.periodType is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelLTMDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: undefined,
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.periodType must be \'historical\' or \'forecast\'.');
      }
    });

    it('should throw an error when options.periodType is defined, but not historical or forecast', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelLTMDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: 'fail',
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.periodType must be \'historical\' or \'forecast\'.');
      }
    });

    it('should throw an error if options.periodString is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelLTMDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: 'forecast',
          periodString: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.periodString must be provided.');
      }
    });

    it('should throw an error if options.timeSeriesName is not defined', async () => {
      const nav = new MDSNavigator('test');

      try {
        await nav.getModelLTMDataPoint({
          csin: 'test',
          ticker: 'TEST_US',
          periodType: 'forecast',
          periodString: 'Q3-2023',
          timeSeriesName: undefined,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.timeSeriesName must be provided.');
      }
    });
  });
});