const ronda = document.getElementById('ronda');
const botonesJuego = document.getElementById('botones_juego')

class Juego{
    constructor(botonesJuego, ronda){
        this,ronda = 0;        //Número de la ronda jugada
        this.pocisionEnSecuancia = 0; //Pocision en el boton que se encuentra el usuario en esa secuencia
        this.totalRondas = 10; //Total de rondas del juego
        this.secuencia = [];   //Secuencia de los botones
        this.velocidad = 1000; //Velocidad del patron de las rondas 
        this.bloqueoBotones = true; 
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
        this.pocisionEnSecuancia = 0;
        this.secuencia = this.crearSecuencias();
        this.botones.forEach((elemento, i)=>{
            elemento.classList.remove('ganador');
            elemento.onclick = () => this.precionarBoton(i);

        });
        this.mostrarSecuencia();
    } 

    //Actualiza las rondas del juego
    actualizarRonda(value){
        this.ronda = value;
        this.display.ronda
    }

    //Creea el arreglo aleatorio para los botones
    crearSecuencias(){
        return Array.from({length: this.totalRondas}, () => this.inicioColorRandom());
    }

    //Eleccion al azar de colores en un rango de 0 a 3
    inicioColorRandom(){
        return Math.floor(Math.random() * 4);
    }

    //Ejecutar al precionar una boton
    precionarBoton(){
        !this.bloqueoBotones && this.validarOpcionCorrecta(value);

    }

    //Validacion del boton precionado por el usuario 
    validarOpcionCorrecta(){
        if(this.secuencia[this.pocisionEnSecuancia] == value){
            this.sonidoBotones[value].play();
            if(this.ronda === this.pocisionEnSecuancia){
                this.actualizarRonda(this.ronda + 1);
                this.speed /= 1.02;
                this.juegoFinalizado();
            }else{
                this.pocisionEnSecuancia++;
            }
        }else{
            this.juegoFinalizado();
        }

    }

    //Verificar que no termine el juego
    juegoFinalizado(){
        if(this.ronda === this.totalRondas){
            this.mostrarSecuencia();
        }else{
            this.pocisionEnSecuancia = 0;
            this.mostrarSecuencia();
        }
    }

    //Mostrata la secuencia de cada ronda
    mostrarSecuencia(){
        this.bloqueoBotones = true;
        let secuenciaIndex = 0;
        let timer = setInterval (() => {
            const botones = this.button[this. secuencia[secuenciaIndex]];
            this.b
        })
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