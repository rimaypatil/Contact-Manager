const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create Contact
router.post('/', async (req, res) => {
  try {
    const { name, phone } = req.body;
    const contact = new Contact({ name, phone });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Contacts
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Search Contact (by name or phone)
router.get('/search', async (req, res) => {
  const { query } = req.query;
  const contacts = await Contact.find({
    $or: [
      { name: new RegExp(query, 'i') },
      { phone: new RegExp(query, 'i') },
    ],
  });
  res.json(contacts);
});

// Get One Contact
router.get('/:id', async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
});

// Update Contact
router.put('/:id', async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete Contact
router.delete('/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});

module.exports = router;
