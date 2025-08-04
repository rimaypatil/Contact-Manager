/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; 

function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      const res = await axios.get(`http://localhost:5000/api/contacts/search?query=${value}`);
      setResults(res.data);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="home-container">
      <h1>Contact Manager</h1>

      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by name or phone..."
        className="search-input"
      />

      {search && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((contact) => (
              <div key={contact._id} className="result-item">
                {contact.name} - {contact.phone}
              </div>
            ))
          ) : (
            <div className="no-result">No match found</div>
          )}
        </div>
      )}

      <div className="button-container">
        <button onClick={() => navigate('/create')}>Create Contact</button>
        <button onClick={() => navigate('/contacts')}>All Contacts</button>
      </div>
    </div>
  );
}

export default Home;






*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://contact-manager-etim.onrender.com/api/contacts')
      .then(res => setContacts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) ||
    contact.phone.includes(search)
  );

  return (
    <div className="home-container">
      <div className="home-header">
       <h1 style={{ color: 'white' }}>Contact Manager</h1>
        <div className="home-actions">
          <input
            type="text"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="create-button" onClick={() => navigate('/create')}>
            New Contact
          </button>
        </div>
      </div>

      <div className="all-contacts">
        <h2>All Contacts ({contacts.length})</h2>
      </div>

      <div className="contact-list-container">
        {filteredContacts.length === 0 ? (
          <p className="no-results">No contacts found.</p>
        ) : (
          <ul className="contact-list">
            {filteredContacts.map((contact) => (
              <li key={contact._id} className="contact-item" onClick={() => navigate(`/contact/${contact._id}`)}>
                <div className="avatar">{contact.name.charAt(0)}</div>
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-phone">{contact.phone}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;