const ronda = document.getElementById('ronda');
const botonesJuego = document.getElementById('botones_juego')

class Juego{
    constructor(botonesJuego, ronda){
        this,ronda = 0;        //Número de la ronda jugada
        this.rondaUsuario = 0; //Número de rondas hechas por el usuario
        this.totalRondas = 10; //Total de rondas del juego
        this.secuencia = [];   //Secuencia de los botones
        this.velocidad = 1000; //Velocidad del patron de las rondas   
        this.botones = Array.from(botonesJuego);
        this.display = {
            ronda
        }
        this.sonidoError = new Audio('./'), //Sonidos del juego
        this.sonidoBotones = new Audio('./sounds/sonidoJuego.mp3');
    }

    //Metodos

    //Inicia el juego
    iniciarRonda() { 
        this.actualizarRonda(0);
        this.rondaUsuario = 0;
        this.secuencia = this.crearSecuencias();
  
    } 

    //Actualiza las rondas del juego
    actualizarRonda(value){
        this.ronda = value;
    }

    //Creea el arreglo aleatorio para los botones
    crearSecuencias(){

    }

    //Eleccion al azar de colores en un rango de 0 a 3
    inicioColorRandom(){

    }

    //Ejecutar al precionar una boton
    precionarBoton(){

    }

    //Validacion del boton precionado por el usuario 
    validarOpcionCorrecta(){

    }

    //Verificar que no termine el juego
    juegoFinalizado(){

    }

    //Mostrata la secuencia de cada ronda
    mostrarSecuencia(){

    }

    //Cambio de color de los botones al mostrar la secuencia
    cambioBoton(){

    }

    //Finalizar el juego si el usuario pierde
    juegoFinalizado(){

    }

    //Mostrar Victora del Juego
    victoriaJuego(){

    }

    

}



const juego = new Juego(botonesJuego, ronda);

let botonBack = document.querySelector("#boton_back");

botonBack.addEventListener("click", function () {
    window.location.href = '../homepage/index.html';
});