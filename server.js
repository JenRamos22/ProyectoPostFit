const express = require('express');
const cors = require('cors');
const db = require('./js/db'); // Importa el pool de conexiones

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta GET para obtener los lugares
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
            res.json(results); // Responde con los lugares
        });
    });
});

// Ruta POST para agregar un nuevo lugar
app.post('/lugares', (req, res) => {
    const { nombre, tipo, ubicacion } = req.body;

    if (!nombre || !tipo || !ubicacion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error al obtener conexión:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }

        connection.query(
            "INSERT INTO lugares (nombre, tipo, ubicacion) VALUES (?, ?, ?)",
            [nombre, tipo, ubicacion],
            (err, result) => {
                connection.release();
                if (err) {
                    console.error("Error al insertar lugar:", err);
                    return res.status(500).json({ error: "Error al insertar lugar" });
                }
                res.status(201).json({ message: "Lugar agregado correctamente", id: result.insertId });
            }
        );
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
