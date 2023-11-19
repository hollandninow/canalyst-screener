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
});