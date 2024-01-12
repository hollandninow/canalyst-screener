const axios = require('axios');
const MDSNavigator = require('../MDSNavigator/MDSNavigator');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.checkModelVersion = async function ( token, options ) {
  options = options || {};
  const { csin, canalystTicker } = options;

  if ( !csin && !canalystTicker )
    throw new Error('One of options.csin or options.canalystTicker must be defined.');

  if ( !token ) 
    throw new Error('Must provide token.');
  
  const navigator = new MDSNavigator(token);
  const modelVersionFromMDS = await navigator.getLatestModelVersion(options);

  const res = await axios({
    method: 'GET',
    url: `http://localhost:3000/api/v1/companies/?${csin ? `csin=${csin}` : `canalystTicker=${canalystTicker}`}`,
    headers: {
      Authorization: `Bearer ${process.env.API_JWT}`,
    }
  });

  const modelVersionFromDB = res.data.data.data[0].version;

  return modelVersionFromDB === modelVersionFromMDS;
}