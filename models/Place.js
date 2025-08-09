//Mongoose model for "Place"

const mongoose = require('mongoose');

//new Schema object for each place
const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  notes: { type: String, default: '' },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  // add userId later during auth step
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

//export model 'Place' for places.js
module.exports = mongoose.model('Place', PlaceSchema);
