import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserID] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    console.log(token);
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        console.log('token:', storedToken);  // Debugging log
        console.log('userId:', storedUserId);  // Debugging log
        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserID(storedUserId);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ userId, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


// const login = (userData, jwtToken) => {
//     console.log('Login UserData:', userData);  // Debugging log
//     setUserID(userData);  // Set the user ID
//     setToken(jwtToken);
//     localStorage.setItem('token', jwtToken);  // Persist token
//     localStorage.setItem('userId', userData);  // Persist userId
//     console.log('Stored userId:', localStorage.getItem('userId'));  // Debugging log to check localStorage
// };


// const logout = () => {
//     setUserID(null);  // Correctly reset the user ID
//     setToken(null);
//     localStorage.removeItem('token');  // Clear token
//     localStorage.removeItem('userId');
// };

// const handleLogin = async (email, password) => {
//     try {
//         const response = await axios.post('http://localhost:5004/login', { email, password });
//         const { token, user } = response.data;

//         if (user && user._id && token) {
//             login(user._id, token);  // Pass user ID and token to AuthContext
//         } else {
//             console.error('Invalid response data:', response.data);
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//     }
// };