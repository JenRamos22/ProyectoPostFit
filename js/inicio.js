document.addEventListener("DOMContentLoaded", function () {
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (nombreUsuario) {
    document.getElementById("nombre-usuario").textContent = nombreUsuario;

    // Mostrar los enlaces si hay sesión
    document.getElementById("programas-link").style.display = "inline-block";
    document.getElementById("comunidad-link").style.display = "inline-block";
    document.getElementById("blog-link").style.display = "inline-block";
  } else {
    // Si no hay sesión, redirige al login
    window.location.href = "login.html";
  }

  // ✅ Lógica para el botón "Cerrar sesión"
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("nombreUsuario");
      window.location.href = "login.html";
    });
  }
});
