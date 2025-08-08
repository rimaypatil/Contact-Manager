
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    
    const { name, phone , tags} = req.body;
    console.log('Received:', req.body);

    console.log(typeof(req.body.tags));
    
    const contact = new Contact({ name, phone, tags});
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tags: tag } : {};
    const contacts = await Contact.find(filter).sort({ name: 1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/search', async (req, res) => {
  const { query } = req.query;
  const contacts = await Contact.find({
    $or: [
      { name: new RegExp(query, 'i') },
      { phone: new RegExp(query, 'i') }
    ]
  });
  res.json(contacts);
});

router.get('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
});



router.put('/:id', async (req, res) => {
  const { name, phone, tags } = req.body;
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, phone, tags },  
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});

module.exports = router;
