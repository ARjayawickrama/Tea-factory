import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserID] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        console.log('token:', storedToken);  
        console.log('userId:', storedUserId);
        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserID(storedUserId);
        }
    }, []);

    // const login = (userData, jwtToken) => {
    //     setUserID(userData);
    //     setToken(jwtToken);
    //     localStorage.setItem('token', jwtToken);
    //     localStorage.setItem('userId', userData);
    // };
 
    const logout = () => {
        setUserID(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        console.log("Token state after logout:", token);  // Should be null
        console.log("UserId state after logout:", userId);


    };

    return (
        <AuthContext.Provider value={{ userId, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
