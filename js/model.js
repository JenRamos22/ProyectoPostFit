

// model.js - Modelo
const Model = {
    lugares: [
        { id: 1, nombre: "Café Pet Lovers", tipo: "Cafetería", ubicacion: "Centro" },
        { id: 2, nombre: "Parque Felino", tipo: "Parque", ubicacion: "Norte" }
    ],
    
    // Cargar lugares desde el archivo JSON o localStorage
    cargarLugares: async function() {
        try {
            const response = await fetch('http://localhost:3000/lugares'); // Nueva URL del backend

            if (response.ok) {
                const data = await response.json();
                // Verificar si hay datos en el JSON
                if (data && Array.isArray(data) && data.length > 0) {
                    this.lugares = data;
                    return this.lugares;
                }
            }
            // Si llegamos aquí, el JSON estaba vacío o inválido
            throw new Error("JSON vacío o inválido");
        } catch (error) {
            console.log("Usando datos del localStorage o predefinidos:", error);
            
            // Intentar cargar desde localStorage
            const lugaresGuardados = localStorage.getItem('petFriendlyLugares');
            if (lugaresGuardados) {
                try {
                    this.lugares = JSON.parse(lugaresGuardados);
                } catch (parseError) {
                    console.error("Error al parsear localStorage:", parseError);
                    // Si hay error al parsear, mantener los lugares predefinidos
                }
            }
            return this.lugares;
        }
    },
    
    obtenerLugares: function() {
        return this.lugares;
    },
    
    agregarLugar: function(nombre, tipo, ubicacion) {
        // Generar un ID único
        const id = this.lugares.length > 0 ? Math.max(...this.lugares.map(lugar => lugar.id)) + 1 : 1;
        const nuevoLugar = { id, nombre, tipo, ubicacion };
        this.lugares.push(nuevoLugar);
        
        // Guardar en localStorage
        localStorage.setItem('petFriendlyLugares', JSON.stringify(this.lugares));
        return nuevoLugar;
    },
    
    eliminarLugar: function(id) {
        const idNumerico = parseInt(id);
        this.lugares = this.lugares.filter(lugar => lugar.id !== idNumerico);
        localStorage.setItem('petFriendlyLugares', JSON.stringify(this.lugares));
    }

};

window.Model = Model;
