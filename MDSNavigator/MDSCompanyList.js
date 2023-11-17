const MDSNavigator = require('./MDSNavigator');
const { convertCSVToArray } = require('../utils/convertCSVToArray');

class MDSCompanyList extends MDSNavigator {
  constructor(token) {
    super(token);
    this.APIQueryURL = 'companies/'
  }
  
  async getCompanyList(options) {
    options = options || {};

    const { sector } = options;

    const formattedSector = sector === undefined ? '' : sector.replace(' ', '%20');

    const queryString = `${this.APIQueryURL}?format=csv&${sector ? `sector=${formattedSector}` : ''}`;
    let companyList;

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