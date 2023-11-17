const axios = require('axios');

class MDSNavigator {
  APIRootURL = 'https://mds.canalyst.com/api/';

  constructor(token) {
    this.instance = axios.create({
      baseURL: this.APIRootURL,
      timeout: 20000,
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}

module.exports = MDSNavigator;