// imports
const express = require('express');
const router = express.Router();
const Place = require('./models/Place');  // Mongoose Place model

// GET places from MongoDB
router.get('/', async (req, res) => {
  try {
    const places = await Place.find(); //find all Places
    res.json(places); //array of places, as JSON
  }
  catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// POST new place to mongoDB
router.post('/', async (req, res) => {
  const { name, type, notes, lat, lng } = req.body;

  //missing fields
  if (!name || !type || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    //create new Place
    const newPlace = new Place({
      name,
      type,
      notes: notes || '',
      position: { lat, lng }
    });
    //save new Place to mongoDB
    const savedPlace = await newPlace.save();
    //send saved Place w/ 201 created status
    res.status(201).json(savedPlace);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

// DELETE a place by ID from mongoDB
//:id is Place's mongoDB _id
router.delete('/:id', async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//export router to use in server.js
module.exports = router;
