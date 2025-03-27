console.log("Cargando controller.js...");

// controller.js - Controlador
const Controller = {
    iniciar: async function() {
        console.log("Iniciando Controller...");
        
        await Model.cargarLugares();
        console.log("Datos cargados:", Model.obtenerLugares());

        // Verifica si el elemento "lista-lugares" existe
        const listaLugares = document.getElementById("lista-lugares");
        console.log("lista-lugares encontrado:", listaLugares);

        if (listaLugares) {
            console.log("Mostrando lugares en la vista...");
            View.mostrarLugares(Model.obtenerLugares());
        } else {
            console.error("ERROR: No se encontró #lista-lugares en el DOM.");
        }
    }
};

window.Controller = Controller;
