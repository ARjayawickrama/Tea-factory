import axios from 'axios';

const API_BASE_URL = 'http://localhost:5004/api'; 

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserDetails = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
        throw error;
    }
};


export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
        throw error;
    }
};
