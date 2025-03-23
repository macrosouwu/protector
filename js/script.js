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
const urlParams = new URLSearchParams(window.location.search);
const alumnoId = window.location.pathname.split('/').pop(); // se obtiene el id desde el url

// solicitud http usando fetch
fetch(`http://localhost:3000/api/alumno/${alumnoId}`)
.then(response => {
    if (!response.ok) {
        throw new Error("Error al obtener los datos del alumno");        
    }
    return response.json(); // convierte respuesta a formato JSON
})
.then(data => {
    //aqui trabajamos con los datos obtenidos
    console.log(data);
    
    // mostrar los datos en la pagina
    const alumnoDiv = document.getElementById('alumno');
    alumnoDiv.innerHTML = `
    
    `    
})