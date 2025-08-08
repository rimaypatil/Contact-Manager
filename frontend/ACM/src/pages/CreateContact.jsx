

import React, { useState } from 'react';
import axios from 'axios';
import './CreateContact.css';

const tagOptions = ['family', 'friends', 'work', 'service', 'education', 'Emergency'];

const CreateContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setPhone(onlyDigits);
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert('Phone number must be 10 digits');
      return;
    }

    try {
     const newContact = { name, phone, tags: selectedTags };
      await axios.post('https://contact-manager-etim.onrender.com/api/contacts', newContact);
      alert('Contact created');
      setName('');
      setPhone('');
      setSelectedTags([]);
    } catch {
      alert('Error creating contact');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Create Contact</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={handlePhoneChange} maxLength="10" required />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <div className="tag-options">
              {tagOptions.map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <button type="submit">Create Contact</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
