const express = require('express');
const router = express.Router();
const usuarioModel = require('../models/usuarioModel');
 // Importa el modelo de usuario

// Ruta para el registro de usuario
router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        // Verificar que todos los campos sean proporcionados
        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Llamada al modelo para registrar el usuario
        const result = await usuarioModel.registrarUsuario(nombre, correo, contrasena);

        res.status(201).json({ message: 'Usuario registrado exitosamente', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Ruta para el login de usuario
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        // Verificar que se proporcionen los campos necesarios
        if (!correo || !contrasena) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Llamada al modelo para verificar las credenciales del usuario
        const user = await usuarioModel.verificarUsuario(correo, contrasena);

        if (user) {
            res.status(200).json({ message: 'Usuario autenticado', user });
        } else {
            res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error detallado:', error); // Para diagnóstico
        res.status(500).json({ error: 'Error al autenticar el usuario' });
    }
});

module.exports = router;
