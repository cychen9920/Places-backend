// places.js
const express = require('express');
const router = express.Router();

// In-memory array to store places
let places = [];
let currentId = 1;  // simple id generator

// GET /places - return all saved places
router.get('/', (req, res) => {
  res.json(places);
});

// POST /places - add a new place
router.post('/', (req, res) => {
    console.log('POST /places body:', req.body);
    const { name, type, notes, lat, lng } = req.body;

    if (!name || !type || lat === undefined || lng === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPlace = {
        id: currentId++,
        name,
        type,
        notes: notes || '',
        position: { lat, lng },
    };

    places.push(newPlace);
    res.status(201).json(newPlace);
});

// DELETE /places/:id - delete a place by id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  places = places.filter(place => place.id !== id);

  res.status(204).send(); // 204 No Content
});

module.exports = router;
