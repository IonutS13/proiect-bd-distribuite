const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const shopController = require('../controllers/shopController');
const jwt = require('jsonwebtoken');

// Middleware Token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token lipsă' });

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token invalid' });
        req.user = decoded;
        next();
    });
};

// Rute Publice
router.post('/login', authController.login);
router.post('/register', authController.register); // <--- Aici e noutatea

// Rute Protejate (trebuie să fii logat)
router.get('/products', verifyToken, shopController.getProducts); 
router.post('/orders', verifyToken, shopController.createOrder);  

module.exports = router;