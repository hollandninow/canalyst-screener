const axios = require('axios');
const MDSNavigator = require('../MDSNavigator/MDSNavigator');
const { isValidCanalystTicker, isValidBloombergTicker } = require('../utils/isValidTicker');

exports.checkModelVersion = async function ( mdsToken, apiToken, options ) {
  options = options || {};
  const { csin, ticker } = options;

  if ( !csin && !ticker )
    throw new Error('One of options.csin or options.ticker must be defined.');

  if ( !mdsToken ) 
    throw new Error('Must provide MDS token.');

  if ( !apiToken ) 
    throw new Error('Must provide token for screener API.');
  
  const navigator = new MDSNavigator(mdsToken);
  const modelVersionFromMDS = await navigator.getLatestModelVersion(options);

  let url;

  if (isValidCanalystTicker(ticker))
    url = `http://localhost:3000/api/v1/companies/?canalystTicker=${ticker}`
  
  if (isValidBloombergTicker(ticker))
    url = `http://localhost:3000/api/v1/companies/?bloombergTicker=${ticker}`

  if (!ticker && csin)
    url = `http://localhost:3000/api/v1/companies/?csin=${csin}`

  if (ticker && !csin)
    throw new Error('Not valid ticker format. Must be 1-4 capital letters followed by either a space or underscore, then two capital letters. e.g. "AAPL_US" or "AAPL US"');

  const res = await axios({
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    }
  });

  const modelVersionFromDB = res.data.data.data[0].version;

  return modelVersionFromDB === modelVersionFromMDS;
}