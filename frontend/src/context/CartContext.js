import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cartItems state with data from localStorage (if available)
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Whenever the cartItems state changes, update localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart and save to state
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item._id === product._id);
            if (existingProduct) {
                // If product already in the cart, increase its quantity
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new product to the cart
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
    };

    // Update quantity of a product in the cart
    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) => {
            return prevItems.map(item =>
                item._id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
