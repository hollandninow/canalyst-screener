const Papa = require('papaparse');

exports.convertCSVToJSON = csv => Papa.parse(csv, { header: true }).data;
