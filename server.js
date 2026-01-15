const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const { sequelizeAuth, sequelizeShop } = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rute API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizare Baze de date
async function startServer() {
    try {
        await sequelizeAuth.authenticate();
        await sequelizeAuth.sync(); 

        await sequelizeShop.authenticate();
        // force: true sterge datele vechi si le pune pe cele noi cand porneste serverul
        await sequelizeShop.sync({ force: true }); 

        app.listen(PORT, () => {
            console.log(`🚀 Server pornit pe http://localhost:${PORT}`);
        });

        // 1. Creăm userul default
        const User = require('./models/User');
        const userCount = await User.count();
        if (userCount === 0) {
             await User.create({ username: 'student', password: '123' });
        }

        // 2. Adăugăm Produse cu POZE REALE (Pexels)
        const Product = require('./models/Product');
        
        const productsData = [
            { 
                name: 'Laptop Gaming ASUS', 
                price: 4500.00, 
                imageUrl: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Mouse Wireless', 
                price: 120.00, 
                imageUrl: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Tastatura Mecanica', 
                price: 350.00, 
                imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Monitor 4K', 
                price: 1800.00, 
                imageUrl: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Casti Audio Sony', 
                price: 850.00, 
                imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Smartwatch', 
                price: 900.00, 
                imageUrl: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Telefon Smartphone', 
                price: 5600.00, 
                imageUrl: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600' 
            },
            { 
                name: 'Scaun Birou', 
                price: 1200.00, 
                imageUrl: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600' 
            }
        ];
        
        await Product.bulkCreate(productsData);
        console.log('✅ Produsele cu POZE REALE au fost adăugate!');

    } catch (error) {
        console.error('❌ EROARE:', error.message);
    }
}

startServer();