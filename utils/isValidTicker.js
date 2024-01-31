exports.isValidCanalystTicker = string => {
  const regex = /^[A-Z0-9]{1,6}[_][A-Z]{2}$/;

  return regex.test(string);
}

exports.isValidBloombergTicker = string => {
  const regex = /^[A-Z0-9]{1,6}[\s][A-Z]{2}$/;

  return regex.test(string);
}