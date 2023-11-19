const axios = require('axios');
const MDSCompanyList = require('./MDSCompanyList');

class MDSNavigator {
  APIRootURL = 'https://mds.canalyst.com/api/';

  constructor(token) {
    if (!token)
      throw new Error('Must pass API token as parameter in constructor.')

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

    return this.companyListArray;
  }

  getCompanyListArray() {
    return this.companyListArray;
  }

  // async getHistoricalData(ticker) {
  //   options = options || {};
  //   const { csin, ticker } = options;

  //   if (csin === undefined && ticker === undefined) 
  //     throw new Error('Must include csin or ticker in parameters.');

  //   if ( ticker.ticker === undefined || ticker.tickerType === undefined )
  //     throw new Error('ticker.ticker and ticker.tickerType must be defined.'); 
  // }

  // async getForecastData(options) {

  // }

  // async getEquityModelSeriesSet(options) {

  // }
}

module.exports = MDSNavigator;