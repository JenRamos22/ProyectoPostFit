document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const message = document.getElementById('registroMessage');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const contrasena = document.getElementById('contrasena').value;
  
      try {
        const res = await fetch('http://localhost:3000/usuarios/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, correo, contrasena })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          message.textContent = '¡Registro exitoso!';
          message.style.color = 'green';
          form.reset();
        } else {
          message.textContent = data.error || 'Ocurrió un error al registrarse';
          message.style.color = 'red';
        }
  
      } catch (error) {
        message.textContent = 'Error de conexión con el servidor';
        message.style.color = 'red';
      }
    });
  });
  