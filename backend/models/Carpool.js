const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  contactNumber: String,
  emailAddress: String,
  campus: String,
  fromLocation: String,
  toLocation: String,
  carpoolDate: String,
  startTime: String,
  endTime: String,
});

const Carpool = mongoose.model('Carpool', carpoolSchema);

module.exports = Carpool;
