const ronda = document.getElementById("ronda");
const botonesJuego = document.getElementById("botones_juego");

class Juego {
    constructor(botonesJuego, ronda) {
        this.ronda = 0; // Número de la ronda jugada
        this.pocisionEnSecuencia = 0; // Posición del usuario en la secuencia
        this.totalRondas = 10; // Total de rondas
        this.secuencia = []; // Secuencia de botones
        this.velocidad = 1000; // Velocidad de la secuencia
        this.bloqueoBotones = true; 
        this.botones = Array.from(botonesJuego.children);
        this.display = { ronda };
        this.sonidoError = new Audio("./sounds/error.mp3");
        this.sonidoBotones = [
            new Audio("./sounds/sonido1.mp3"),
            new Audio("./sounds/sonido2.mp3"),
            new Audio("./sounds/sonido3.mp3"),
            new Audio("./sounds/sonido4.mp3"),
        ];
    }

    iniciarRonda() {
        this.actualizarRonda(0);
        this.pocisionEnSecuencia = 0;
        this.secuencia = this.crearSecuencias();
        this.botones.forEach((elemento, i) => {
            elemento.classList.remove("ganador");
            elemento.onclick = () => this.precionarBoton(i);
        });
        this.mostrarSecuencia();
    }

    actualizarRonda(value) {
        this.ronda = value;
        this.display.ronda.textContent = `Ronda: ${this.ronda}`;
    }

    crearSecuencias() {
        return Array.from({ length: this.totalRondas }, () => this.inicioColorRandom());
    }

    inicioColorRandom() {
        return Math.floor(Math.random() * 4);
    }

    precionarBoton(value) {
        if (!this.bloqueoBotones) {
            this.validarOpcionCorrecta(value);
        }
    }

    validarOpcionCorrecta(value) {
        if (this.secuencia[this.pocisionEnSecuencia] === value) {
            this.sonidoBotones[value].play();
            if (this.pocisionEnSecuencia === this.ronda) {
                this.actualizarRonda(this.ronda + 1);
                this.velocidad /= 1.02;
                this.juegoFinalizado();
            } else {
                this.pocisionEnSecuencia++;
            }
        } else {
            this.sonidoError.play();
            this.juegoFinalizado();
        }
    }

    juegoFinalizado() {
        if (this.ronda === this.totalRondas) {
            this.victoriaJuego(); // Si alcanza la última ronda, gana
        } else {
            alert("Has perdido, intenta de nuevo!"); // Mensaje de derrota
            this.iniciarRonda(); // Reinicia el juego
        }
    }

    mostrarSecuencia() {
        this.bloqueoBotones = true;
        let secuenciaIndex = 0;
        let timer = setInterval(() => {
            if (secuenciaIndex >= this.ronda + 1) {
                clearInterval(timer);
                this.bloqueoBotones = false;
                return;
            }
            this.cambioBoton(this.secuencia[secuenciaIndex]);
            secuenciaIndex++;
        }, this.velocidad);
    }

    cambioBoton(index) {
        this.botones[index].classList.add("activo"); // Agrega clase activa
        setTimeout(() => {
            this.botones[index].classList.remove("activo"); // La quita después de un tiempo
        }, this.velocidad / 2); // Se mantiene encendido la mitad del tiempo de la ronda
    }

    victoriaJuego() {
        alert("¡Felicidades! Has ganado el juego."); // Mensaje de victoria
        this.iniciarRonda(); // Reinicia el juego
    }
}

const juego = new Juego(botonesJuego, ronda);

document.querySelector("#boton_back").addEventListener("click", function () {
    window.location.href = "../homepage/index.html";
});