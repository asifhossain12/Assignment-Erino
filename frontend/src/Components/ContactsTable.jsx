import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const ContactsTable = ({ contacts, onContactEdit, fetchContacts }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'first_name', 
    direction: 'asc',  
  });

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this contact?')) {
        await axios.delete(`${apiUrl}/contacts/${id}/delete/`);
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSort = (key) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Button onClick={() => handleSort('first_name')}>
                First Name
                {sortConfig.key === 'first_name' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleSort('last_name')}>
                Last Name
                {sortConfig.key === 'last_name' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleSort('email')}>
                Email
                {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleSort('phone')}>
                Phone
                {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleSort('company_name')}>
                Company
                {sortConfig.key === 'company_name' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleSort('job_title')}>
                Job Title
                {sortConfig.key === 'job_title' && (sortConfig.direction === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
              </Button>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company_name}</TableCell>
                <TableCell>{contact.job_title}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onContactEdit(contact)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No contacts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
