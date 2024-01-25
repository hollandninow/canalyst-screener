exports.validCanalystTickerArray = [
 'A_BC',
 'AB_CD',
 'ABC_DE',
 'ABCD_EF',
 'AAPL_US',
 'C_US',
 'BMO_CN',
];

exports.invalidCanalystTickerArray = [
  '_AA',
  ' AA',
  '',
  ' ',
  'ABCDE_FG',
  'abcd_US',
  'ABCD_us',
  'abcd_us',
  '1234',
  '1234_US',
  '_AAPL_US',
  'A US',
  'A BC',
  'AB CD',
  'ABC DE',
  'ABCD EF',
];

exports.validBloombergTickerArray = [
  'A US',
  'A BC',
  'AB CD',
  'ABC DE',
  'ABCD EF',
  'AAPL US',
  'C US',
  'BMO CN',
];

exports.invalidBloombergTickerArray = [
  '_AA',
  ' AA',
  '',
  ' ',
  'ABCDE_FG',
  'abcd_US',
  'ABCD_us',
  'abcd_us',
  '1234',
  '1234_US',
  '_AAPL_US',
  'A_US',
  'A_BC',
  'AB_CD',
  'ABC_DE',
  'ABCD_EF',
];