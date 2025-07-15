const usuarioModel = require('../models/usuarioModel'); // Importa el modelo de usuario

// Controlador para manejar el registro de usuarios
const registrarUsuario = (req, res) => {
    const { nombre, correo, contrasena } = req.body; // Obtiene los datos del cuerpo de la solicitud

    // Crea un objeto con los datos del usuario
    const usuarioData = { nombre, correo, contrasena };

    // Llama a la función del modelo para registrar al usuario
    usuarioModel.registrarUsuario(usuarioData, (err, result) => {
        if (err) {
            return res.status(500).json(err); // Si hay un error, responde con el error
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente', result });
    });
};

// Controlador para manejar el login de usuarios
const loginUsuario = (req, res) => {
    const { correo, contrasena } = req.body; // Obtiene los datos del cuerpo de la solicitud

    // Llama a la función del modelo para obtener al usuario por correo
    usuarioModel.obtenerUsuarioPorCorreo(correo, (err, usuario) => {
        if (err) {
            return res.status(404).json(err); // Si no se encuentra el usuario o hay error
        }

        // Aquí puedes agregar validación de la contraseña, por ejemplo usando bcrypt
        if (usuario.contrasena !== contrasena) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si la contraseña es correcta, responde con un mensaje de éxito
        res.status(200).json({ message: 'Login exitoso', usuario });
    });
};

module.exports = { registrarUsuario, loginUsuario };
