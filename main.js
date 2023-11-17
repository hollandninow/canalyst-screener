const MDSCompanyList = require('./MDSNavigator/MDSCompanyList');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


const main = async () => {
  try {
    const companyList = await new MDSCompanyList(process.env.CANALYST_JWT).getCompanyList({ sector: 'reinsurance' });

    console.log(companyList);
  } catch (err) {
    console.error(err);
  }
}

main();