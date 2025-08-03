const express = require('express');
const cors = require('cors');
const placesRouter = require('./places');

const app = express();
app.use(cors());               // Allow cross-origin requests from frontend
app.use(express.json());       // Parse JSON bodies

app.use('/places', placesRouter);

app.delete('/places/:id', (req, res) => {
  const id = parseInt(req.params.id);
  places = places.filter(place => place.id !== id);
  res.status(200).json({ message: 'Place deleted' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
