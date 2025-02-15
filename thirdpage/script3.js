//const ronda = document.getElementById("ronda");
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
        }

        iniciarRonda() {
            console.log("Iniciando la ronda...");
            this.ronda = 0;
            this.pocisionEnSecuencia = 0;
            this.secuencia = this.crearSecuencia();
            this.botones.forEach((elemento, i) => {
                elemento.classList.remove("ganador");
                elemento.addEventListener("click", () => this.precionarBoton(i));
            });

            setTimeout(() => this.mostrarSecuencia(), 2000);
        }

        crearSecuencia() {
            return Array.from({ length: this.totalRondas }, () => Math.floor(Math.random() * 4));
        }

        precionarBoton(value) {
            if (!this.bloqueoBotones) {
                this.reproducirSonido(value); // Reproducir sonido al hacer clic
                this.validarOpcionCorrecta(value);
            }
        }

        reproducirSonido(index) {
            if (this.sonidoBotones[index]) {
                this.sonidoBotones[index].currentTime = 0; // Reiniciar sonido si ya se estaba reproduciendo
                this.sonidoBotones[index].play();
            }
        }

        validarOpcionCorrecta(value) {
            if (this.secuencia[this.pocisionEnSecuencia] === value) {
                this.sonidoBotones[value].play();
                if (this.pocisionEnSecuencia === this.ronda) {
                    this.ronda++;
                    this.velocidad /= 1.02;
                    this.juegoFinalizado();
                } else {
                    this.pocisionEnSecuencia++;
                }
            } else {
                this.sonidoError.play();
                alert("Has perdido, intenta de nuevo!");
                this.iniciarRonda();
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
            this.botones[index].classList.add("activo");
            setTimeout(() => {
                this.botones[index].classList.remove("activo");
            }, this.velocidad / 2);
        }

        juegoFinalizado() {
            if (this.ronda === this.totalRondas) {
                alert("¡Felicidades! Has ganado el juego.");
                this.iniciarRonda();
            }
        }
    }

    const juego = new Juego(botonesJuego);

    setTimeout(() => {
        juego.iniciarRonda();
    }, 2000);

    document.querySelector("#boton_back").addEventListener("click", function () {
        window.location.href = "../homepage/index.html";
    });
});