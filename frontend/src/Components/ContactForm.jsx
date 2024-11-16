import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';





const ContactForm = ({ onContactAdd, onContactUpdate, editingContact }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company_name: '',
    job_title: '',
  });

  const apiUrl = import.meta.env.VITE_API_URL;  


  
  useEffect(() => {
    if (editingContact) {
      setFormData({
        id: editingContact.id, 
        first_name: editingContact.first_name,
        last_name: editingContact.last_name,
        email: editingContact.email,
        phone: editingContact.phone,
        company_name: editingContact.company_name,
        job_title: editingContact.job_title,
      });
    }
  }, [editingContact]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        
        await onContactUpdate(formData);
      } else {
        
        const response = await axios.post(`${apiUrl}/contacts/create/`, formData);
        
        onContactAdd(response.data);  
      }
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_name: '',
        job_title: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
      <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
      <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
      <TextField label="Company" name="company_name" value={formData.company_name} onChange={handleChange} />
      <TextField label="Job Title" name="job_title" value={formData.job_title} onChange={handleChange} />
      <Button variant="contained" type="submit">
        {editingContact ? 'Update Contact' : 'Add Contact'}
      </Button>
    </Box>
  );
};

export default ContactForm;
