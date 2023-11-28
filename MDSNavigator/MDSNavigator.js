const axios = require('axios');
const { convertCSVToArray } = require('../utils/convertCSVToArray');

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

  async getModelData(options) {
    options = options || {};
    const { csin, ticker, dataType } = options;

    if (!(dataType === 'historical' || dataType === 'forecast'))
      throw new Error('options.dataType must be \'historical\' or \'forecast\'.');

    if ( !csin && !ticker ) 
      throw new Error('One of options.csin or options.ticker must be defined.');

    const queryString = `equity-model-series/${csin ? csin : ticker}/equity-models/latest/bulk-data/${dataType}-data.csv`;

    try {
      const res = await this.instance.get(queryString);

      const data = convertCSVToArray(res.data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getLatestModelVersion(options) {
    options = options || {};
    const { csin, ticker } = options;

    if ( !csin && !ticker ) 
      throw new Error('One of options.csin or options.ticker must be defined.');

    const queryString = `equity-model-series/${csin ? csin : ticker}`;

    try {
      const res = await this.instance.get(queryString);

      return res.data.latest_equity_model.model_version.name;
    } catch (err) {
      throw err;
    }
  }

  async getModelDataPoint(options) {
    options = options || {};

    const { csin, ticker, periodType, periodString, timeSeriesName } = options;

    if ( !csin && !ticker ) 
      throw new Error('One of options.csin or options.ticker must be defined.');

    if (!(periodType === 'historical' || periodType === 'forecast'))
      throw new Error('options.periodType must be \'historical\' or \'forecast\'.');

    if (!periodString)
      throw new Error('options.periodString must be provided.');

    if (!timeSeriesName)
      throw new Error('options.timeSeriesName must be provided.')

    const queryString = `equity-model-series/${csin ? csin : ticker}/equity-models/latest/${periodType}-periods/${periodString}/data-points/?time_series_name=${timeSeriesName}`;

    try {
      const res = await this.instance.get(queryString);

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async getModelLTMDataPoint(options) {
    try {
      const data = await this.getModelDataPoint(options);
      console.log(data);

      const LTMData = data.results[0].derived_data[0]?.value;

      if (!LTMData)
        throw new Error(`LTM data not available on this metric (${options.timeSeriesName}).`);

      return LTMData;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MDSNavigator;