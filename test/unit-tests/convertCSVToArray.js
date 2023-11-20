const fs = require('fs');
const { expect } = require('chai');
const { convertCSVToArray } = require('../../utils/convertCSVToArray');

describe('convertCSVToArray', () => {
  it('should convert CSV to array of objects', () => {
    const csv = fs.readFileSync('./test/test-data/companyListReinsurance.csv', 'utf-8');

    const data = convertCSVToArray(csv);

    const randomIndex = Math.floor(Math.random() * data.length);
    const keys = Object.keys(data[randomIndex]);

    expect(data.length).to.be.equal(11);
    expect(Array.isArray(data)).to.be.true;
    expect(keys.length).to.be.equal(9);
    expect(keys[0]).to.be.equal('company_id');
    expect(keys[1]).to.be.equal('company_name');
    expect(keys[2]).to.be.equal('is_in_coverage');
  expect(keys[3]).to.be.equal('CapIQ');
    expect(keys[4]).to.be.equal('FactSet');
    expect(keys[5]).to.be.equal('Thomson');
    expect(keys[6]).to.be.equal('Canalyst');
    expect(keys[7]).to.be.equal('Bloomberg');
    expect(keys[8]).to.be.equal('sector_path');
  });

  
});