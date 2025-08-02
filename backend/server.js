const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => console.error(err));
