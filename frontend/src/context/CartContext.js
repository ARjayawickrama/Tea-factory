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
    const addToCart = (product, selectedWeight, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item._id === product._id && item.selectedWeight === selectedWeight);
            if (existingProduct) {
                // If product already in the cart with the same weight, increase its quantity
                return prevItems.map(item =>
                    item._id === product._id && item.selectedWeight === selectedWeight
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new product with selected weight to the cart
                return [...prevItems, { ...product, selectedWeight, quantity }];
            }
        });
    };

    // Clear all items from the cart
    const clearCart = () => {
        setCartItems([]); // Reset cartItems to an empty array
    };

    // Remove product from cart
    const removeFromCart = (productId, selectedWeight) => {
        setCartItems((prevItems) => prevItems.filter(item => !(item._id === productId && item.selectedWeight === selectedWeight)));
    };

    // Update quantity of a product in the cart
    const updateQuantity = (productId, selectedWeight, newQuantity) => {
        setCartItems((prevItems) => {
            return prevItems.map(item =>
                item._id === productId && item.selectedWeight === selectedWeight
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart,  clearCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
