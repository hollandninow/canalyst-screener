const sinon = require('sinon');
const { expect } = require('chai');
const MDSCompanyList = require('../../MDSNavigator/MDSCompanyList');

describe('MDSCompanyList', () => {
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

  describe('getCompanyList', () => {
    it('should retrieve data when given no parameters', async () => {
      const list = new MDSCompanyList('test');
      const listStub = sinon.stub(list, 'getCompanyList');
      const responseData = { data: 'csv' };
      listStub.resolves(responseData);
  
      const data = await list.getCompanyList();
  
      expect(data).to.be.deep.equal(responseData);
    });

    // TODO: doesn't really test the method, it is just circular
    it('should retrieve data options.sector is a string', async () => {
      const list = new MDSCompanyList('test');
      const listStub = sinon.stub(list, 'getCompanyList');
      const responseData = { data: 'csv' };
      listStub.resolves(responseData);
  
      const data = await list.getCompanyList({
        sector: 'test',
      });
  
      expect(data).to.be.deep.equal(responseData);
    });

    it('should throw an error when options.sector is not a string', async () => {
      
      try {
        await new MDSCompanyList('test').getCompanyList({
          sector: 123,
        });
      } catch (err) {
        expect(err).to.be.an('Error');
        expect(err.message).to.be.equal('options.sector must be of type String.');
      }

    });
  });
});