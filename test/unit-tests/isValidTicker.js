const { isValidBloombergTicker, isValidCanalystTicker } = require('../../utils/isValidTicker');
const { validCanalystTickerArray, 
        invalidCanalystTickerArray, 
        validBloombergTickerArray,
        invalidBloombergTickerArray } = require('../../testHelpers/testTickers');

describe('isValidTicker', () => {
  describe('isValidCanalystTicker', () => {
    it('returns true for strings that are 1-4 uppercase letters followed by 1 underscore, followed by two uppercase letters', () => {
      for( let i = 0; i < validCanalystTickerArray; i++ ) {
        expect(isValidCanalystTicker(validCanalystTickerArray[i])).to.be.true;
      }
    });

    it('returns false strings of any other form', () => {
      for( let i = 0; i < invalidCanalystTickerArray; i++ ) {
        expect(isValidCanalystTicker(invalidCanalystTickerArray[i])).to.be.false;
      }
    });
  });

  describe('isValidBloombergTicker', () => {
    it('returns true for strings that are 1-4 uppercase letters followed by 1 space, followed by two uppercase letters', () => {
      for( let i = 0; i < validBloombergTickerArray; i++ ) {
        expect(isValidBloombergTicker(validBloombergTickerArray[i])).to.be.true;
      }
    });

    it('returns false strings of any other form', () => {
      for( let i = 0; i < invalidBloombergTickerArray; i++ ) {
        expect(isValidBloombergTicker(invalidBloombergTickerArray[i])).to.be.false;
      }
    });
  });
});