const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  tags: [{type: String}]
 
});

module.exports = mongoose.model('Contact', contactSchema);
