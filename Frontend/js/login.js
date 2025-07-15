document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        loginMessage.textContent = "Inicio de sesión exitoso. ¡Bienvenida!";
        loginMessage.style.color = "#e86c5f";

        localStorage.setItem("nombreUsuario", data.user.nombre);
      
        // ✅ Redirigir a la página principal después del login
        window.location.href = "inicio.html";
      }
      
      else {
        loginMessage.textContent = data.error || "Error al iniciar sesión.";
        loginMessage.style.color = "red";
      }
    } catch (error) {
      loginMessage.textContent = "Error en el servidor.";
      loginMessage.style.color = "red";
    }
  });
});
