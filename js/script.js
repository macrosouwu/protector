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

fetch(`http://localhost:3000/api/certificados/${alumnoId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Muestra los datos obtenidos
  })
  .catch(error => {
    console.error('Error al obtener los datos', error); // Muestra un error si la solicitud falla
  });


