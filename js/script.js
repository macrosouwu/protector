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
const alumnoId = 1;

fetch(`http://localhost:3000/api/alumno/${alumnoId}`)
.then(response => response.json())
.catch(error => console.error('Error al obtener los datos', error));