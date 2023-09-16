const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company must have a name.'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters'],
    },
    csin: {
      type: String,
      required: [true, 'Company must have a CSIN.'],
      unique: true,
      trim: true,
      minLength: [10, 'CSIN must be 10 characters.'],
      maxLength: [10, 'CSIN must be 10 characters.'],
      immutable: true,
      uppercase: true,
    },
    canalystTicker: {
      type: String,
      required: [true, 'Company must have a ticker.'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    bloombergTicker: {
      type: String,
      required: [true, 'Company must have a ticker.'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    countryCode: {
      type: String,
      required: [true, 'Company must have a country code.'],
      trim: true,
      minLength: [2, 'Country code must be 2 characters.'],
      maxLength: [2, 'Country code must be 2 characters.'],
      lowerCase: true,
    },
    version: {
      type: String,
      required: [true, 'Company must have a version.'],
      trim: true,
      uppercase: true,
    },
    mostRecentPeriod: {
      type: String,
      required: [true, 'Company must have a most recent period.'],
      trim: true,
      uppercase: true,
    },
    mrpDuration: {
      type: String,
      required: [true, 'Company must have a most recent period (MRP) duration.'],
      trim: true,
    },
    mrpStartDate: {
      type: String,
      required: [true, 'Company must have a most recent period (MRP) start date.'],
      trim: true,
    },
    mrpEndDate: {
      type: String,
      required: [true, 'Company must have a most recent period (MRP) end date.'],
      trim: true,
    },
    isInCoverage: {
      type: Boolean,
      required: [true, 'Company must be in coverage or not in coverage'],
    },
    reportingFrequency: {
      type: String,
      required: [true, 'Company must have a reporting frequency.'],
      trim: true,
      uppercase: true,
    },
    tradingCurrency: {
      type: String,
      required: [true, 'Company must have a trading currency.'],
      trim: true,
      uppercase: true,
    },
    reportingCurrency: {
      type: String,
      required: [true, 'Company must have a reporting currency.'],
      trim: true,
      uppercase: true,
    },
  }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;