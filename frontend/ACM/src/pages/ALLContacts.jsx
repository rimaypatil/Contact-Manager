import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllContacts.css';

function AllContacts() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/contacts')
      .then(res => setContacts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="list-container">
      <h2>All Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="contact-list">
          {contacts.map(contact => (
            <li key={contact._id} onClick={() => navigate(`/contact/${contact._id}`)}>
              {contact.name} - {contact.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllContacts;





