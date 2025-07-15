const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Usa las rutas de usuario
app.use('/usuarios', usuarioRoutes);

// Agrega la ruta para verificar sesión
app.get('/verificar-sesion', (req, res) => {
  res.json({
    autenticado: true,
    usuario: { nombre: 'Jenn' }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
