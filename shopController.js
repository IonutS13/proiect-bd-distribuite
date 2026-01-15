const Product = require('../models/Product');
const Order = require('../models/Order');

// Listare produse din BD 2
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Plasare comandă (Scrie în BD 2, dar folosește ID din BD 1 prin Token)
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Luat din JWT (Userul logat)
        const { productId, quantity } = req.body;

        await Order.create({
            user_id: userId,
            product_id: productId,
            quantity: quantity
        });

        res.json({ message: 'Comanda a fost salvată în Shop DB!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};