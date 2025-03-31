console.log("hola mundo !");

// Hacemos que la busqueda por id no nos envie al principio de la pagina al dar enter



const inputs = document.querySelectorAll(".input")

function scrollToTop() {
  document.getElementById("certificados-container").scrollIntoView({ behavior: "smooth" });
}
function scrollToForm() {
  document.getElementById("main-formcontainer").scrollIntoView({ behavior: "smooth" });
}

function focusFunc(){
    let parent = this.parentNode;
    parent.classList.add("focus");
}
function blurFunc(){
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");    
    }
    
}



inputs.forEach(input => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);    
});

// Empezamos con la API
// Obtener el ID desde los parámetros de consulta

// Selecciona el campo de búsqueda
const searchInput = document.getElementById("search-bar");
console.log(searchInput);


// Función para obtener el ID de la URL
function obtenerIdDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("obteniendourl...");
    
    return urlParams.get('id'); // Obtiene el valor del parámetro "id"
}

// Función para buscar al alumno
function buscarAlumno(alumnoId = null) {
    console.log("ejecutando func...");
    alumnoId = alumnoId || searchInput.value.trim(); // Usa el ID de la URL o del input
    
    
    console.log(searchInput.value);
    
    if (!alumnoId) return; // Si no hay ID, no hace la solicitud

    fetch(`https://proyectoqr-backendapi.onrender.com/api/certificados/${alumnoId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (!data.alumno) {
                console.error("No se encontraron datos del alumno");
                return;
            }

            // Formatea fechas
            const fechaIniFormateada = new Date(data.alumno.fecha_inicio).toLocaleDateString("es-MX");
            const fechaFinFormateada = new Date(data.alumno.fecha_fin).toLocaleDateString("es-MX");

            // Asigna valores a la tabla
            document.getElementById("pnombre-alumno").textContent = data.alumno.nombre_alumno;
            document.getElementById("nombre-alumno").textContent = data.alumno.nombre_alumno;
            document.getElementById("calificacion-alumno").textContent = data.alumno.cali;
            document.getElementById("grupo-alumno").textContent = data.alumno.clave_grupo;
            document.getElementById("curso-alumno").textContent = data.alumno.clave_curso;
            document.getElementById("inicio-alumno").textContent = fechaIniFormateada;
            document.getElementById("fin-alumno").textContent = fechaFinFormateada;
            document.getElementById("nombre-curso").textContent = data.alumno.nombre_curso;

            // Verifica y muestra materias
            document.getElementById("certificados-container").scrollIntoView({ behavior: "smooth" });
            const tablaBody = document.getElementById("tabla-body");
            if (!tablaBody) {
                console.error("Error: No se encontró una tabla con id tabla-body");
                return;
            }

            tablaBody.innerHTML = ""; // Limpia la tabla antes de agregar nuevas filas

            if (data.materias && data.materias.length > 0) {
                data.materias.forEach(materia => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${materia.nombre_materia}</td>
                        <td>${materia.duracion_t}</td>
                    `;
                    tablaBody.appendChild(fila);
                });
            } else {
                console.log("No hay materias disponibles");
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos', error);
        });
}

// Evento para buscar al presionar "Enter"
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que se recargue la página en formularios
        console.log("Enter presionado en searchInput... ejecutando buscarAlumno()");
        buscarAlumno();
    }
});


// Verificar si hay un ID en la URL y hacer la búsqueda automáticamente
const idDesdeURL = obtenerIdDesdeURL();
if (idDesdeURL) {
    buscarAlumno(idDesdeURL);
}


