const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-local-database-name'; // Set your local database name here

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const carpoolRoutes = require('./routes/carpoolRoutes');
const findCarpoolersRoutes = require('./routes/findCarpoolersRoutes');

app.use('/api/carpools', carpoolRoutes);
app.use('/api/findCarpoolers', findCarpoolersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
