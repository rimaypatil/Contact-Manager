import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactDetails.css';
import { Phone } from 'lucide-react';

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const tagOptions = ['family', 'friends', 'work', 'service', 'education', 'emergency'];

  useEffect(() => {
    axios.get(`https://contact-manager-etim.onrender.com/api/contacts/${id}`)
      .then(res => {
        setContact(res.data);
        setName(res.data.name);
        setPhone(res.data.phone);
        setTags(res.data.tags || []);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleTagChange = (tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleUpdate = async () => {
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
    try {
      await axios.put(`https://contact-manager-etim.onrender.com/api/contacts/${id}`, { name, phone, tags });
      alert('Contact updated successfully!');
      setEditMode(false);
      navigate('/contacts');
    } catch (err) {
      alert('Failed to update contact');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://contact-manager-etim.onrender.com/api/contacts/${id}`);
        alert('Contact deleted successfully');
        navigate('/contacts');
      } catch (err) {
        alert('Failed to delete contact');
      }
    }
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <div className="details-container">
      {editMode ? (
        <div className="edit-mode">
          <h2>Edit Contact</h2>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Phone"
            maxLength="10"
          />

          <div className="tag-options">
            {tagOptions.map((tag) => (
              <label key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag}
              </label>
            ))}
          </div>

          <div className="button-group">
            <button className="save-btn" onClick={handleUpdate}>Save</button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <h2>{contact.name}</h2>
          <div className="phone-wrapper">
            <Phone size={18} className="phone-icon" />
            <span>{contact.phone}</span>
          </div>
          <div className="tags">
            {contact.tags && contact.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="button-group">
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Contact</button>
            <button className="delete-btn" onClick={handleDelete}>Delete Contact</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactDetails;