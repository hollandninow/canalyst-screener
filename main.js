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

  } catch (err) {
    console.error(err);
  }
}

main();