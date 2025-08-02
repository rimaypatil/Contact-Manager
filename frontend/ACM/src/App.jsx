import React,{useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import AllContacts from './pages/ALLContacts';
import ContactDetails from './pages/ContactDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateContact />} />
      <Route path="/contacts" element={<AllContacts />} />
      <Route path="/contact/:id" element={<ContactDetails />} />
    </Routes>
  )
}

export default App
