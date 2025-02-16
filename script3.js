document.addEventListener("DOMContentLoaded", function () {
    const botonesJuego = document.querySelector(".botones_juego");

    if (!botonesJuego) {
        console.error("Error: No se encontró el contenedor de los botones.");
        return;
    }

    class Juego {
        constructor(botonesJuego) {
            this.ronda = 0;
            this.pocisionEnSecuencia = 0;
            this.totalRondas = 10;
            this.secuencia = [];
            this.velocidad = 1000;
            this.bloqueoBotones = true;
            this.botones = Array.from(botonesJuego.children);
            this.sonidoError = new Audio("./sounds/error.mp3");
            this.sonidoBotones = [
                new Audio("./sounds/sonido1.mp3"),
                new Audio("./sounds/sonido2.mp3"),
                new Audio("./sounds/sonido3.mp3"),
                new Audio("./sounds/sonido4.mp3"),
            ];
            this.iniciarJuego(); // Corrección: inicia el juego inmediatamente
        }

        iniciarJuego() {
            this.ronda = 0;
            this.velocidad = 1000;
            this.secuencia = this.crearSecuencia();
            this.botones.forEach((elemento, i) => {
                elemento.classList.remove("ganador");
                elemento.addEventListener("click", () => this.precionarBoton(i));
            });
            this.iniciarRonda();
        }

        iniciarRonda() {
            console.log("Iniciando la ronda...");
            this.pocisionEnSecuencia = 0;
            this.bloqueoBotones = true;
            setTimeout(() => this.mostrarSecuencia(), 1000);
        }

        crearSecuencia() {
            return Array.from({ length: this.totalRondas }, () => Math.floor(Math.random() * 4));
        }

        precionarBoton(value) {
            if (!this.bloqueoBotones) {
                this.reproducirSonido(value);
                this.validarOpcionCorrecta(value);
            }
        }

        reproducirSonido(index) {
            if (this.sonidoBotones[index]) {
                this.sonidoBotones[index].currentTime = 0;
                this.sonidoBotones[index].play();
            }
        }

        validarOpcionCorrecta(value) {
            if (this.secuencia[this.pocisionEnSecuencia] === value) {
                if (this.pocisionEnSecuencia === this.ronda) {
                    this.ronda++;
                    if (this.ronda === this.totalRondas) {
                        alert("¡Felicidades! Has ganado el juego.");
                        this.iniciarJuego();
                    } else {
                        setTimeout(() => this.iniciarRonda(), 1000);
                    }
                } else {
                    this.pocisionEnSecuencia++;
                }
            } else {
                this.sonidoError.play();
                alert("Has perdido, intenta de nuevo!");
                this.iniciarJuego();
            }
        }

        mostrarSecuencia() {
            let secuenciaIndex = 0;
            let timer = setInterval(() => {
                if (secuenciaIndex > this.ronda) {
                    clearInterval(timer);
                    this.bloqueoBotones = false;
                    return;
                }
                this.cambioBoton(this.secuencia[secuenciaIndex]);
                secuenciaIndex++;
            }, this.velocidad);
        }

        cambioBoton(index) {
            this.botones[index].classList.add("activo");
            setTimeout(() => {
                this.botones[index].classList.remove("activo");
            }, this.velocidad / 2);
        }
    }

    const juego = new Juego(botonesJuego);

    document.querySelector("#boton_back").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});