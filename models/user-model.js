const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  phone: Number,
  uid: String,
  // data_protection: Array
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;