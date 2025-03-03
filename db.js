const mongoose = require('mongoose');

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ouzandeitu@proton.me:Saraouzande96@cluster0.fkomt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,  // Evitar advertencias de índice
      useFindAndModify: false,  // Evitar advertencias de findAndModify
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);  // Termina el proceso si no se puede conectar
  }
};

module.exports = connectDB;
