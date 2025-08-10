const express = require('express');
const router = express.Router(); // create express router
const Place = require('./models/Place');  // Mongoose Place model
const authToken = require('./authentication/user_auth');

// GET places from MongoDB (only for given user)
router.get('/', authToken, async (req, res) => {
  try {
    //get user id from JWT
    const userId = req.user.userId;
    //find all places in MongoDB associated with userId
    const places = await Place.find({ user: userId });
    res.json(places); // array of places as JSON
  }
  catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// POST new place to mongoDB (assoc with current user)
router.post('/', authToken, async (req, res) => {
  const { name, type, notes, lat, lng } = req.body;

  // Missing fields
  if (!name || !type || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const userId = req.user.userId;

    const newPlace = new Place({
      name,
      type,
      notes: notes || '', //notes not required
      position: { lat, lng },
      user: userId // Associate with logged-in user
    });

    const savedPlace = await newPlace.save();

    console.log('New place saved!')
    res.status(201).json(savedPlace);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
    console.error('Error saving place:', err);
  }
});

// DELETE a place by ID from mongoDB (IFF belongs to user)
router.delete('/:id', authToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    //try to find place matching _id and user
    const place = await Place.findOne({ _id: req.params.id, user: userId });

    if (!place) {
      return res.status(404).json({ error: 'Place not found or unauthorized' });
    }

    await place.deleteOne();
    res.status(204).send();
  }
  catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

//export router to use in server.js
module.exports = router;
