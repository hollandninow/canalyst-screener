const { convertCSVToArray } = require('../utils/convertCSVToArray');

class MDSCompanyList {
  constructor(axiosInstance) {
    if (!axiosInstance)
      throw new Error('Must pass an Axios instance as parameter in constructor.');

    if(!axiosInstance.defaults)
      throw new Error('instance.defaults is undefined. Axios instance not passed or not configured correctly.');

    const defaults = axiosInstance.defaults;

    if (defaults.baseURL !== 'https://mds.canalyst.com/api/')
      throw new Error('Axios instance BaseURL must be \"https://mds.canalyst.com/api/\".');

    if (!defaults.headers.Authorization)
      throw new Error('Axios instance missing Authorization header with Canalyst API token.');

    if (!defaults.timeout === 0)
      throw new Error('Axios instance timeout property needs to be set.');

    this.instance = axiosInstance;

    this.APIQueryURL = 'companies/'
  }
  
  async getCompanyList(options) {
    options = options || {};

    const { sector } = options;

    if (typeof sector !== 'string')
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