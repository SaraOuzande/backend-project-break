const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const app = express();

dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));  // Servir archivos estáticos

app.use(productRoutes);  // Usar las rutas de productos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
