const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Logica de Login (deja o aveai)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });

        if (!user) {
            return res.status(401).json({ message: 'Credențiale invalide!' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, message: 'Login reușit!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- LOGICA NOUĂ PENTRU REGISTER ---
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Verificăm dacă există deja
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Acest username este deja folosit!' });
        }

        // 2. Creăm userul în db_auth
        await User.create({ username, password });

        res.status(201).json({ message: 'Cont creat cu succes! Te poți loga acum.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};