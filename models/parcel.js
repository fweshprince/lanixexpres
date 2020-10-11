const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  parcelId: String,
  clientName: String,
  clientEmail: String,
  clientLocation: String,
  senderName: String,
  senderLocation: String,
  weight: String,
  location: String,
  movementDate: Date,
  arrivalDate: Date,
  status: String,
  comment: String,
  parcelRecipt: Object,
});

module.exports = mongoose.model('parcel', schema);
