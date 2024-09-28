const Cart = require('../../model/CartModel/CartM');

// Add product to cart
async function addToCart(req, res) {
    const {  productId, selectedWeight, price, quantity } = req.body;
    const userId = req.user.id;

    console.log('Request body:', req.body); // Log request body
    console.log('User ID:', req.user.id); // Log user ID for debugging


    if (!productId || !selectedWeight || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            // Check if the item already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => 
                item.productId.toString() === productId && item.selectedWeight === selectedWeight
            );
            if (existingItemIndex > -1) {
                // Update quantity if item already exists
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to existing cart
                cart.items.push({ productId, selectedWeight, price, quantity });
            }
            await cart.save();   
            return res.status(200).json({ message: 'Item added to cart successfully' });
        } else {
            // Create a new cart for the user
            const newCart = new Cart({
                userId,
                items: [{ productId, selectedWeight, price, quantity }],
            });
            await newCart.save();
            return res.status(200).json({ message: 'Cart created and item added' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
}

// Get cart by user ID
async function getCartByUserId(req, res) {
    const userId = req.user.id; // Get userId from the token

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
}

// Remove item from cart
async function removeFromCart(req, res) {
    const {  productId, selectedWeight } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });
        
        if (cart) {
            cart.items = cart.items.filter(item => !(item.productId.toString() === productId && item.selectedWeight === selectedWeight));
            await cart.save();
            return res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });
    }
}   

// Update item quantity in cart
async function updateCartItemQuantity(req, res) {
    const {  productId, selectedWeight, quantity } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => 
                item.productId.toString() === productId && item.selectedWeight === selectedWeight
            );
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
                await cart.save();
                return res.status(200).json({ message: 'Cart updated successfully', cart });
            } else {
                return res.status(404).json({ message: 'Item not found in cart' });
            }
        } else {
            return res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
}

module.exports = { addToCart, getCartByUserId, removeFromCart, updateCartItemQuantity };
