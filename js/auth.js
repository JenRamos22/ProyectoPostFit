document.addEventListener("DOMContentLoaded", function () {
  // Verificar sesión
  fetch('http://localhost:3000/verificar-sesion')
    .then(response => response.json())
    .then(data => {
      if (data.autenticado) {
        // Mostrar el nombre del usuario (si existe)
        const nombreUsuario = document.getElementById('nombre-usuario');
        if (nombreUsuario) {
          nombreUsuario.textContent = data.usuario.nombre;
        }

        // Mostrar los enlaces de programas, comunidad y blog solo si existen
        const programasLink = document.getElementById('programas-link');
        if (programasLink) {
          programasLink.style.display = 'inline-block';
        }

        const comunidadLink = document.getElementById('comunidad-link');
        if (comunidadLink) {
          comunidadLink.style.display = 'inline-block';
        }

        const blogLink = document.getElementById('blog-link');
        if (blogLink) {
          blogLink.style.display = 'inline-block';
        }

      } else {
        // Redirigir a la página de login si no está autenticado
        window.location.href = "/login.html";
      }
    });

  // Código para el menú hamburguesa
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('nav');
  
  if (menuToggle && mainNav) {
    // Alternar menú al hacer clic en el botón hamburguesa
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Cerrar el menú cuando se hace clic en cualquier enlace dentro del menú
    const menuLinks = document.querySelectorAll('.main-nav a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }
});
