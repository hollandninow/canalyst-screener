const axios = require('axios');
const MDSNavigator = require('../MDSNavigator/MDSNavigator');

exports.checkModelVersion = async function ( mdsToken, apiToken, options ) {
  options = options || {};
  const { csin, canalystTicker } = options;

  if ( !csin && !canalystTicker )
    throw new Error('One of options.csin or options.canalystTicker must be defined.');

  if ( !mdsToken ) 
    throw new Error('Must provide MDS token.');

  if ( !apiToken ) 
  throw new Error('Must provide token for screener API.');
  
  const navigator = new MDSNavigator(mdsToken);
  const modelVersionFromMDS = await navigator.getLatestModelVersion(options);

  const res = await axios({
    method: 'GET',
    url: `http://localhost:3000/api/v1/companies/?${csin ? `csin=${csin}` : `canalystTicker=${canalystTicker}`}`,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    }
  });

  const modelVersionFromDB = res.data.data.data[0].version;

  return modelVersionFromDB === modelVersionFromMDS;
}