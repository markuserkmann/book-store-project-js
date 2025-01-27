const path = require('path')
const db = require(path.resolve(__dirname, '../util/db'))

class CartController {
    constructor() {}

    async addItemToCart(userId, product) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
                [userId, product.id]
            );

            if (rows.length > 0) {
                const currentQuantity = rows[0].quantity;
                const newQuantity = currentQuantity + 1;

                await db.query(
                    'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?',
                    [newQuantity, userId, product.id]
                );
            } else {
                await db.query(
                    'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
                    [userId, product.id, 1]
                );
            }
        } catch (err) {
            console.error('Error adding item to cart:', err);
        }
    }

    async getCartItems(userId) {
    }

    async clearCart(userId) {
        try {
            await db.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);
        } catch (err) {
            console.error('Error clearing cart:', err);
        }
    }
}

module.exports = new CartController();
