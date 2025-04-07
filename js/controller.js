console.log("Cargando controller.js...");

// controller.js - Controlador
const Controller = {
    iniciar: async function() {
        console.log("Iniciando Controller...");

        // Verifica si la página tiene el contenedor de lugares
        const listaLugares = document.getElementById("lista-lugares");

        if (!listaLugares) {
            console.warn("Esta página no tiene lista de lugares. No se ejecuta la carga.");
            return; // Detiene la ejecución si no está en la página correcta
        }

        await Model.cargarLugares();
        console.log("Datos cargados:", Model.obtenerLugares());

        console.log("lista-lugares encontrado:", listaLugares);
        View.mostrarLugares(Model.obtenerLugares());
    }
};

window.Controller = Controller;
