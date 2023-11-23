const axios = require('axios');
const { convertCSVToArray } = require('../utils/convertCSVToArray');

class MDSCompanyList {
  constructor(token) {
    if (!token)
      throw new Error('Must pass API token as parameter in constructor.')

    this.instance = axios.create({
      baseURL: 'https://mds.canalyst.com/api/',
      timeout: 20000,
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });

    this.APIQueryURL = 'companies/'
  }
  
  async getCompanyList(options) {
    options = options || {};

    const { sector } = options;

    if (typeof sector !== 'string' || !( sector instanceof String ))
      throw new Error('options.sector must be of type String.');

    const formattedSector = sector === undefined ? '' : sector.replace(' ', '%20');

    const queryString = `${this.APIQueryURL}?format=csv&${sector ? `sector=${formattedSector}` : ''}`;

    try {
      const res = await this.instance.get(queryString);

      const data = convertCSVToArray(res.data);
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MDSCompanyList;