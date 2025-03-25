console.log("hola mundo !");

const inputs = document.querySelectorAll(".input")

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

const urlParams = new URLSearchParams(window.location.search);
const alumnoId = urlParams.get('id'); // Obtiene el valor del parámetro "id"

console.log(alumnoId); // Verás "1" si el parámetro id es 1

fetch(`https://proyectoqr-backendapi.onrender.com/api/certificados/${alumnoId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Muestra los datos obtenidos
    console.log(data.materias[0].nombre_materia);

    if (!data.alumno) {
        console.error("No se encontraron datos del alumno");
        return;
    }

    const fechaIniFormateada = new Date(data.alumno.fecha_inicio).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    
    const fechaFinFormateada = new Date(data.alumno.fecha_fin).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

    //Asignamos valores a tabla del alumno

    document.getElementById("nombre-alumno").textContent = data.alumno.nombre_alumno;
    document.getElementById("calificacion-alumno").textContent = data.alumno.cali;
    document.getElementById("grupo-alumno").textContent = data.alumno.clave_grupo;
    document.getElementById("curso-alumno").textContent = data.alumno.clave_curso;
    document.getElementById("inicio-alumno").textContent = fechaIniFormateada;
    document.getElementById("fin-alumno").textContent = fechaFinFormateada;
    document.getElementById("nombre-curso").textContent = data.alumno.nombre_curso;


    if (!data.materias || data.materias.length === 0) {
        console.log("No hay materias disponibles");
        return;
    }
    const tablaBody = document.getElementById("tabla-body");
    if (!tablaBody) {
        console.error("Error: No se encontro una tabla con id tabla-body");
        return;
    }

    tablaBody.innerHTML = "";

    data.materias.forEach(materia => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${materia.nombre_materia}</td>
        <td>${materia.duracion_t}</td>
        `
        tablaBody.appendChild(fila);
    });


  }

    )
 

  .catch(error => {
    console.error('Error al obtener los datos', error); // Muestra un error si la solicitud falla
  });


