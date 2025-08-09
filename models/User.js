//Mongoose model for "User"

const mongoose = require('mongoose');

//create new user Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//export for auth.js
module.exports = mongoose.model('User', UserSchema);
