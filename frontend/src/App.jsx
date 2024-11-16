import React, { useState, useEffect } from 'react';
import ContactForm from './Components/ContactForm';
import ContactsTable from './Components/ContactsTable';
import { Container, Typography, Box, Pagination } from '@mui/material';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;



const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(1); 
  const [sortField, setSortField] = useState('first_name'); 

  
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/contacts/`, {
        params: {
          page: currentPage,
          page_size: pageSize,
          sort: sortField,  
        }        
      });

      const contactsData = response.data.results || [];  // Fallback to an empty array
      const totalCount = response.data.count;

      setContacts(response.data.results);  
      setTotalPages(Math.ceil(response.data.count / pageSize));  
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, pageSize, sortField]);  

  const handleContactAdd = (newContact) => {
    setContacts([...contacts, newContact]);  
  };

  const handleContactEdit = (contact) => {
    setEditingContact(contact);  
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      
      const response = await axios.put(`${apiUrl}/contacts/${updatedContact.id}/update/`, updatedContact);
  
      
      setContacts(contacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      ));
  
      
      setEditingContact(null); 
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

 
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  
  const handleSortChange = (field) => {
    setSortField(field);  
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contact Management System
      </Typography>
      
      <Box marginBottom={4}>
        <ContactForm 
          onContactAdd={handleContactAdd} 
          onContactUpdate={handleUpdateContact}  
          editingContact={editingContact}  
        />
      </Box>
      
      <ContactsTable
        contacts={contacts}
        onContactEdit={handleContactEdit} 
        fetchContacts={fetchContacts} 
        handleSortChange={handleSortChange}  
      />
      
      <Box marginTop={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default App;
