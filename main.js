const MDSNavigator = require('./MDSNavigator/MDSNavigator');
const MDSCompanyList = require('./MDSNavigator/MDSCompanyList');
const { convertCSVToArray } = require('./utils/convertCSVToArray');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const main = async () => {
  try {
    // const navigator = new MDSNavigator(process.env.CANALYST_JWT);

    // const list = await navigator.initCompanyList({ sector: 'reinsurance' });
    // console.log(list);

    const list = new MDSCompanyList(process.env.CANALYST_JWT);
    const data = await list.getCompanyList({
      sector: 'reinsurance',
    });
    console.log(data);

    // const data = await navigator.getModelData({ 
    //   ticker: 'AAPL_US',
    //   dataType: 'historical',
    // });
    // console.log(data);

    // const data = await navigator.getLatestModelVersion({
    //   ticker: 'AAPL_US',
    // });
    // console.log(data);

    // const data = await navigator.getModelDataPoint({
    //   ticker: 'FTNT_US',
    //   periodType: 'historical',
    //   periodString: 'Q3-2023',
    //   timeSeriesName: 'MO_RIS_EPS_WAD_Adj'
    //   // timeSeriesName: 'MO_RIS_REV'
    // });
    // console.log(data);

    // const data = await navigator.getModelLTMDataPoint({
    //   ticker: 'FTNT_US',
    //   periodType: 'historical',
    //   periodString: 'Q3-2023',
    //   timeSeriesName: 'MO_BS_SE'
    //   // timeSeriesName: 'MO_RIS_EPS_WAD_Adj'
    //   // timeSeriesName: 'MO_RIS_REV'
    // });
    // console.log(data);

  } catch (err) {
    console.error(err);
  }
}

main();