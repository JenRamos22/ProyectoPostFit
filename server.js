const express = require('express');
const cors = require('cors');
const db = require('./js/db'); // Importa el pool de conexiones

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/lugares', (req, res) => {
    db.getConnection((err, connection) => { // Obtener conexión del pool
        if (err) {
            console.error('Error al obtener conexión:', err);
            return res.status(500).json({ error: 'Error al obtener conexión a la base de datos' });
        }

        connection.query('SELECT * FROM lugares', (err, results) => {
            connection.release(); // Libera la conexión después de la consulta

            if (err) {
                console.error('Error al obtener lugares:', err);
                return res.status(500).json({ error: 'Error al obtener lugares', details: err.message });
            }

            res.json(results);
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
