// ================= PERSONALIZACIÓN =================
// Aquí puedes modificar las frases, nombres y tiempos sin tocar el resto del código.

const CONFIG = {
    // Frases para la sección 3 (Puedes agregar, quitar o editar)
    frases: [
        "Espero que nunca olvides lo mucho que vales, incluso en esos días en los que tú misma no lo veas.",
        "Gracias por ser esa personita que, de una u otra forma, hace más bonitos algunos días.",
        "Quizás no siempre lo digo, pero me alegra muchísimo haberte conocido.",
        "Que este nuevo año de tu vida te traiga momentos que te hagan sonreír de verdad.",
        "Y aunque te diga Brujita... sabes que es con cariño 😂✨",
        "Espero que sigas siendo esa persona tan auténtica, loca, especial y única que eres."
    ],
    // Carta final
    cartaFinal: `Espero que este nuevo año venga cargado de cosas bonitas para ti.<br><br>Que cumplas muchos sueños, que tengas muchísimas razones para sonreír y que nunca te falten personas que te recuerden lo increíble que eres.`,
    
    // Tiempos de las animaciones (en milisegundos)
    tiempos: {
        intro: 2000,
        revelacion: 1500
    }
};
// ================= FIN DE PERSONALIZACIÓN =================

// Utilidad para esperar (Sleep)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Cargar elementos principales
document.addEventListener("DOMContentLoaded", async () => {
    crearFondoMagico();
    configurarMusica();
    
    // Secuencia de Pantalla 1
    await sleep(1000);
    document.getElementById("intro-text-1").classList.add("show");
    await sleep(CONFIG.tiempos.intro);
    document.getElementById("intro-text-2").classList.add("show");
    await sleep(1500);
    document.getElementById("btn-enter").classList.add("show");
});

// Función para cambiar de pantalla
function cambiarPantalla(actual, siguiente) {
    document.getElementById(`screen-${actual}`).classList.remove("active");
    setTimeout(() => {
        document.getElementById(`screen-${siguiente}`).classList.add("active");
    }, 1000); // Esperar que termine el fade out
}

// Botón: Entrar (De Pantalla 1 a 2)
document.getElementById("btn-enter").addEventListener("click", async () => {
    cambiarPantalla(1, 2);
    
    // Secuencia Pantalla 2
    await sleep(1500);
    document.getElementById("reveal-text-1").classList.add("show");
    await sleep(CONFIG.tiempos.revelacion);
    document.getElementById("reveal-text-2").classList.add("show");
    await sleep(CONFIG.tiempos.revelacion);
    document.getElementById("reveal-text-3").classList.add("show");
    await sleep(1500);
    document.getElementById("btn-next-quotes").classList.add("show");
});

// Lógica de Frases (Pantalla 3)
let fraseActual = 0;
const quoteText = document.getElementById("quote-text");
const quoteCard = document.getElementById("quote-card");

document.getElementById("btn-next-quotes").addEventListener("click", () => {
    cambiarPantalla(2, 3);
    mostrarFrase();
});

function mostrarFrase() {
    quoteCard.style.opacity = 0;
    setTimeout(() => {
        if (fraseActual < CONFIG.frases.length) {
            quoteText.innerHTML = CONFIG.frases[fraseActual];
            quoteCard.style.opacity = 1;
            fraseActual++;
        } else {
            // Si ya no hay frases, pasar a la pantalla interactiva
            cambiarPantalla(3, 4);
        }
    }, 500);
}

quoteCard.addEventListener("click", mostrarFrase);

// Lógica Luna Interactiva (Pantalla 4)
const moon = document.getElementById("interactive-moon");
const moonMessage = document.getElementById("moon-message");
const btnFinal = document.getElementById("btn-final");
let moonClicked = false;

moon.addEventListener("click", async () => {
    if (moonClicked) return;
    moonClicked = true;
    
    moon.classList.add("clicked");
    await sleep(800);
    moonMessage.classList.add("show");
    await sleep(2000);
    btnFinal.classList.add("show");
});

// Lógica Carta Final (Pantalla 5)
btnFinal.addEventListener("click", async () => {
    cambiarPantalla(4, 5);
    await sleep(1500);
    
    const introStr = "Si llegaste hasta aquí, entonces sí puedo decirte algo...";
    await efectoEscritura("final-intro", introStr, 50);
    
    await sleep(1000);
    document.getElementById("letter-content").innerHTML = CONFIG.cartaFinal;
    document.getElementById("final-letter").classList.add("show");
    
    await sleep(1000);
    lanzarConfetiMagico();
});

// Efecto de máquina de escribir
async function efectoEscritura(id, texto, velocidad) {
    const el = document.getElementById(id);
    el.innerHTML = "";
    for (let i = 0; i < texto.length; i++) {
        el.innerHTML += texto.charAt(i);
        await sleep(velocidad);
    }
}

// Generador de partículas (Fondo Mágico)
function crearFondoMagico() {
    const container = document.getElementById("magic-background");
    const cantidad = 50;
    
    for (let i = 0; i < cantidad; i++) {
        let particle = document.createElement("div");
        particle.className = "particle";
        // Tamaño aleatorio
        let size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        // Posición inicial aleatoria
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        // Duración y retraso aleatorio para la animación
        let duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s, ${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s, ${Math.random() * 10}s`;
        
        container.appendChild(particle);
    }
}

// Generador de confeti elegante (dorado y morado suave)
function lanzarConfetiMagico() {
    const container = document.getElementById("confetti-container");
    const colores = ['#ffd700', '#d4a5ff', '#ffb6c1', '#ffffff'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            let confeti = document.createElement("div");
            confeti.className = "confetti";
            confeti.style.left = `${Math.random() * 100}vw`;
            confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            
            // Variación en tamaño y velocidad
            let size = Math.random() * 8 + 4;
            confeti.style.width = `${size}px`;
            confeti.style.height = `${size}px`;
            
            let duration = Math.random() * 3 + 2;
            confeti.style.animationDuration = `${duration}s`;
            
            // Forma redonda o cuadrada aleatoria
            if (Math.random() > 0.5) confeti.style.borderRadius = "50%";
            
            container.appendChild(confeti);
            
            // Limpiar DOM después de caer
            setTimeout(() => confeti.remove(), duration * 1000);
        }, i * 50); // Caen progresivamente
    }
}

// Lógica de Música
function configurarMusica() {
    const btnMusica = document.getElementById("music-btn");
    const audio = document.getElementById("bg-music");
    let isPlaying = false;
    
    // Bajar volumen a un nivel suave
    audio.volume = 0.4;
    
    btnMusica.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            btnMusica.innerHTML = "🎵 Música: OFF";
            btnMusica.style.opacity = 0.5;
        } else {
            audio.play().catch(e => console.log("Audio bloqueado, esperando interacción."));
            btnMusica.innerHTML = "🎵 Música: ON";
            btnMusica.style.opacity = 1;
        }
        isPlaying = !isPlaying;
    });
}