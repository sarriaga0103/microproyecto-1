const nombreForm = document.getElementById('nombreForm');
const nombreInput = document.getElementById('nombreInput');

// Agregar un evento de envío al formulario
nombreForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener el nombre ingresado
    const nombre = nombreInput.value;

    // Validar que el nombre no esté vacío
    if (nombre.trim() === '') {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

});