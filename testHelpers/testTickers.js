exports.validCanalystTickerArray = [
 'A_BC',
 'AB_CD',
 'ABC_DE',
 'ABCD_EF',
 'AAPL_US',
 'C_US',
 'BMO_CN',
 'ABCDE_FG',
 '8096_JP',
 'DB1_GR'
];

exports.invalidCanalystTickerArray = [
  '_AA',
  ' AA',
  '',
  ' ',
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
  '8096 JP',
  'DB1 GR'
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
  'ABCDE AB'
];

exports.invalidBloombergTickerArray = [
  '_AA',
  ' AA',
  '',
  ' ',
  'abcd_US',
  'ABCDE_FG',
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