const db = require('../db');  // Subir un nivel desde 'models' a 'Backend'
 // Importa la conexión a la base de datos

// Función para registrar un nuevo usuario
const registrarUsuario = (nombre, correo, contrasena) => {
    return new Promise((resolve, reject) => {
        if (!nombre || !correo || !contrasena) {
            return reject({ error: 'Todos los campos son obligatorios' });
        }

        const query = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
        db.query(query, [nombre, correo, contrasena], (err, result) => {
            if (err) {
                return reject({ error: 'Error al registrar el usuario', details: err.message });
            }
            resolve(result);
        });
    });
};

// Función para obtener un usuario por su correo
const obtenerUsuarioPorCorreo = (correo) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuarios WHERE correo = ?';
        db.query(query, [correo], (err, results) => {
            if (err) {
                return reject({ error: 'Error al obtener el usuario', details: err.message });
            }
            if (results.length === 0) {
                return resolve(null); // Usuario no encontrado
            }
            resolve(results[0]);
        });
    });
};

// ✅ Función para verificar usuario (correo y contraseña)
const verificarUsuario = async (correo, contrasena) => {
    try {
        const usuario = await obtenerUsuarioPorCorreo(correo);

        if (!usuario) {
            return null;
        }

        // Aquí podrías usar bcrypt para comparar si guardas contraseñas cifradas
        if (usuario.contrasena === contrasena) {
            return usuario;
        } else {
            return null;
        }

    } catch (error) {
        throw error;
    }
};

// Exporta todas las funciones necesarias
module.exports = {
    registrarUsuario,
    obtenerUsuarioPorCorreo,
    verificarUsuario
};
