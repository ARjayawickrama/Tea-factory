const Cart = require('../../model/CartModel/CartM');

// Add product to cart
async function addToCart(req, res) {
    const { items } = req.body;  // Expect an array of items
    const userId = req.user.id;

    console.log('Request body:', req.body); // Log request body
    console.log('User ID:', req.user.id); // Log user ID for debugging

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            items.forEach(item => {
                const { productId, productName, quantity, weight, price } = item;
                // Check if the item already exists in the cart by productId and weight
                const existingItemIndex = cart.items.findIndex(existingItem => 
                    existingItem.productId.toString() === productId && existingItem.weight === weight
                );
                if (existingItemIndex > -1) {
                    // Update quantity if the item already exists
                    cart.items[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item to existing cart
                    cart.items.push({ productId, productName, quantity, weight, price });
                }
            });
            await cart.save();
            return res.status(200).json({ message: 'Items added to cart successfully' });
        } else {
            // Create a new cart for the user
            const newCart = new Cart({
                userId,
                items: items  // Set the items directly
            });
            await newCart.save();
            return res.status(200).json({ message: 'Cart created and items added' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
}



// Get cart by user ID
const getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from the authenticated request
        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json({ items: cart.items });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Remove item from cart
async function removeFromCart(req, res) {
    const { productId, weight } = req.body; // Expecting productId and weight in request body
    const userId = req.user.id; // Get userId from the authenticated token

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the item that matches both productId and weight
        cart.items = cart.items.filter(item => 
            !(item.productId.toString() === productId && item.weight === weight)
        );

        // If no items left in the cart, you might want to consider clearing it or sending a different response
        if (cart.items.length === 0) {
            await Cart.deleteOne({ userId }); // Optionally delete empty cart
        } else {
            await cart.save(); // Save the updated cart
        }

        return res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        console.error('Error removing item from cart:', error); // Log error for debugging
        return res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
}



// Update item quantity in cart
// Update item quantity in cart
async function updateCartItemQuantity(req, res) {
    const { productId, weight, quantity } = req.body;
    const userId = req.user.id; // Get userId from the authenticated token

    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => 
            item.productId.toString() === productId && item.weight === weight
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity; // Update the quantity
            await cart.save(); // Save the updated cart
            return res.status(200).json({ message: 'Cart updated successfully', items: cart.items });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error updating cart:', error.message);
        return res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
}



module.exports = { addToCart, getCartByUserId, removeFromCart, updateCartItemQuantity };
 