// view.js - Vista
const View = {
    mostrarLugares: function(lugares) {
        const lista = document.getElementById("lista-lugares");
        if (!lista) return; // Verificación si no estamos en la página correcta
        
        lista.innerHTML = "";
        
        if (lugares.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay lugares registrados aún.";
            lista.appendChild(mensaje);
            return;
        }
        
        lugares.forEach(lugar => {
            const item = document.createElement("li");
            item.innerHTML = `
                <strong>${lugar.nombre}</strong> 
                <p>Tipo: ${lugar.tipo}</p>
                <p>Ubicación: ${lugar.ubicacion}</p>
            `;
            lista.appendChild(item);
        });
    },

    mostrarMensaje: function(mensaje, tipo = 'info') {
        // Crear elemento para mostrar mensajes temporales
        const mensajeEl = document.createElement('div');
        mensajeEl.className = `mensaje ${tipo}`;
        mensajeEl.textContent = mensaje;
        
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(mensajeEl, main.firstChild);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                mensajeEl.remove();
            }, 3000);
        }
    }
};
