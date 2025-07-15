const mysql = require('mysql2');

const db = mysql.createPool({  // Cambia createConnection por createPool
    host: 'localhost',
    user: 'root',
    password: 'PostFit2025', // Tu contraseña
    database: 'post_fit',
    waitForConnections: true,
    connectionLimit: 10, // Máximo 10 conexiones simultáneas
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos de MySQL');
    connection.release(); // Libera la conexión para que pueda reutilizarse
});

module.exports = db;

