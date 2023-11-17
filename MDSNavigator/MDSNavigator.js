const axios = require('axios');
const MDSCompanyList = require('./MDSCompanyList');

class MDSNavigator {
  APIRootURL = 'https://mds.canalyst.com/api/';

  constructor(token) {
    this.token = token;

    this.instance = axios.create({
      baseURL: this.APIRootURL,
      timeout: 20000,
      headers: {
        Authorization: 'Bearer ' + this.token,
      }
    });
  }

  async initCompanyList(options) {
    this.companyListArray = await new MDSCompanyList(this.token).getCompanyList(options);
  }

  getCompanyListArray() {
    return this.companyListArray;
  }
}

module.exports = MDSNavigator;