const Papa = require('papaparse');

exports.convertCSVToArray = csv => Papa.parse(csv, { header: true }).data.slice(0,-1);
