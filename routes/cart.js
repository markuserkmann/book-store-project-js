const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.resolve(__dirname, '../util/db'))
const CartController = require('../controllers/cartController.js');

router.get('/cart/:id', async(req, res) =>{
    let ID = req.params.id
    const cartItems = await CartController.getCartItems(ID);
    res.render('cart', { cartItems });
})

router.post('/add-to-cart', async (req, res) => {
    const { userId, productId } = req.body;
    console.log(req.body)
    await CartController.addItemToCart(userId, productId);
    const cartItems = await CartController.getCartItems(userId);
    res.json({ message: 'Item added to cart', cartItems });
});

module.exports = router;
