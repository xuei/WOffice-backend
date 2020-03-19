// place-model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  description: String,
  country: String,
  city: String,
  address: String,
  bedrooms: Number,
  sleeps: Number,
  features: Array, // array checkbox
  dates: Date, /// look for a way to use dates checkbox or something or a function
  imgUrl: String,
  // imgPath: String,
  owner: String,
  // uid?
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;