exports.isValidCanalystTicker = string => {
  const regex = /^[A-Z]{1,4}[_][A-Z]{2}$/;

  return regex.test(string);
}

exports.isValidBloombergTicker = string => {
  const regex = /^[A-Z]{1,4}[\s][A-Z]{2}$/;

  return regex.test(string);
}