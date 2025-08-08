
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, [selectedTag]);

  const fetchContacts = async () => {
    try {
      const url = selectedTag
        ? `https://contact-manager-etim.onrender.com/api/contacts?tag=${selectedTag}`
        : 'https://contact-manager-etim.onrender.com/api/contacts';
      const res = await axios.get(url);
      setContacts(res.data);
      const allTags = [...new Set(res.data.flatMap((c) => c.tags))];
      setTags(allTags);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) return fetchContacts();
    try {
      const res = await axios.get(
        `https://contact-manager-etim.onrender.com/api/contacts/search?query=${query}`
      );
      setContacts(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const goToCreate = () => navigate('/create');

  const handleCardClick = (id) => navigate(`/contact/${id}`);

  return (
    <div className="home-container">
      <h1>Contact Manager</h1>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <button onClick={goToCreate}>Create Contact</button>
      </div>
      <div className="card-list">
        {contacts.length ? (
          contacts.map((contact) => (
            <div
              className="contact-card"
              key={contact._id}
              onClick={() => handleCardClick(contact._id)}
            >
              <div className="avatar">{contact.name[0]}</div>
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
                <div className="tags">
                  {contact.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No contacts found</p>
        )}
      </div>
    </div>
  );
};

export default Home;

