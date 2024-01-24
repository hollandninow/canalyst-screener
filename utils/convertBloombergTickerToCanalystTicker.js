const { isValidBloombergTicker } = require('./isValidTicker');

exports.convertBloombergTickerToCanalystTicker = ticker => {
  if (!isValidBloombergTicker)
    throw new Error('Ticker provided is not a valid Bloomberg ticker. i.e. 1-4 uppercase letters followed by a space, followed by 2 uppercase letters.');

  return ticker.replace(' ', '_');
}