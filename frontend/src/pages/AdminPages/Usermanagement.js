import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Registration from '../../components/user_management/Registration';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ConfirmationModal from '../../components/Alert/ConfirmationModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const usersPerPage = 5; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error.message);
      setError('Error deleting user. Please try again later.');
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await handleDelete(userToDelete);
      setUserToDelete(null);
      setShowConfirmationModal(false);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowConfirmationModal(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      gender: user.gender || ''
    });
  };

  const handleAdd = () => {
    setAddingUser(true);
  };

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
    setAddingUser(false);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5004/api/users/${id}`, editFormData);
      const updatedUser = response.data;
      setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error.message);
      setError('Error updating user. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginLeft: '200px' }} className='bg-slate-100'>
      <AdminDashboard />

      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="w-9/12">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleAdd}
        >
          Add User
        </button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || '-'}</TableCell>
                  <TableCell>{user.gender || '-'}</TableCell>
                  <TableCell>
                    <button onClick={() => handleEdit(user)}>
                      <FaEdit className="w-6 h-6 text-blue-400" />
                    </button>
                    <button onClick={() => confirmDelete(user._id)}>
                      <MdDelete className="w-6 h-6 text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={1} sx={{ marginTop: 1 }}>
          <Pagination count={Math.ceil(filteredUsers.length / usersPerPage)} page={currentPage} onChange={handlePageChange} />
        </Stack>
      </div>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingUser._id);
            }}>
              <div className="mb-4 w-96">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" value={editFormData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={editFormData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <input type="text" id="gender" name="gender" value={editFormData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <button type="submit" className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
              <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setEditingUser(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <Registration show={addingUser} handleClose={() => setAddingUser(false)} handleUserAdded={handleUserAdded} />
    </Box>
  );
};

export default UserManagement;

