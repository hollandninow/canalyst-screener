const MDSNavigator = require('./MDSNavigator/MDSNavigator');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const main = async () => {
  try {
    const navigator = new MDSNavigator(process.env.CANALYST_JWT);

    // const list = await navigator.initCompanyList({ sector: 'reinsurance' });
    // console.log(list);

    // const data = await navigator.getModelData({ 
    //   ticker: 'AAPL_US',
    //   dataType: 'historical',
    // });
    // console.log(data);

    // const data = await navigator.getLatestModelVersion({
    //   ticker: 'AAPL_US',
    // });
    // console.log(data);

    const data = await navigator.getModelDataPoint({
      ticker: 'AAPL_US',
      periodType: 'historical',
      periodString: 'Q3-2023',
      // timeSeriesName: 'MO_RIS_EPS_WAD_Adj'
      timeSeriesName: 'MO_RIS_REV'
    });
    console.log(data.results[0].derived_data);

  } catch (err) {
    console.error(err);
  }
}

main();