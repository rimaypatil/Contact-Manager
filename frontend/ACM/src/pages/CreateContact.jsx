import React, { useState } from 'react';
import axios from 'axios';
import './CreateContact.css';

const CreateContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const onlyDigits = input.replace(/\D/g, '');
    // Limit phone number to 10 digits
    if (onlyDigits.length <= 10) {
      setPhone(onlyDigits);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert('Phone number must be exactly 10 digits');
      return;
    }
    try {
      const newContact = { name, phone };
      await axios.post('http://localhost:5000/api/contacts', newContact);
      alert('Contact created successfully');
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error creating contact:', error);
      alert('Failed to create contact');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Create Contact</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <button type="submit">Create Contact</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
