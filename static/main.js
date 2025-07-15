const caracteristicas_por_personaje = {
  sidney: ["mujer", "gorro", "pelo_largo", "pelirrojo", "izquierda", "tez_clara"],
  olivia: ["mujer", "multicolor", "derecha", "tez_morena", "afro"],
  amy: [
    "mujer", "accesorios", "lentes", "pelo_corto", "pelo_suelto",
    "derecha", "tez_clara", "multicolor",
  ],
  laura: [
    "mujer", "accesorios", "pelo_largo", "aretes", "pelo_suelto",
    "negro", "ondulado", "izquierda", "tez_morena",
  ],
  maya: ["mujer", "pelo_largo", "pelirrojo", "izquierda", "tez_clara"],
  sam: [
    "mujer", "pelo_largo", "pelo_suelto", "negro", "ondulado",
    "izquierda", "tez_morena",
  ],
  zara: ["mujer", "pelo_corto", "rubio", "izquierda", "tez_clara"],
  ethan: ["hombre", "accesorios", "aretes", "negro", "ondulado", "derecha", "tez_clara"],
  diego: ["hombre", "negro", "izquierda", "tez_clara"],
  theo: ["hombre", "gorro", "castanio", "izquierda", "tez_clara"],
  dylan: ["hombre", "negro", "copete", "derecha", "tez_clara"],
  jasper: ["hombre", "accesorios", "lentes", "rubio", "izquierda", "copete", "tez_clara"],
  marcus: ["hombre", "rubio", "corte_militar", "derecha", "tez_morena"],
  luke: ["hombre", "accesorios", "lentes", "castanio", "izquierda", "tez_clara"],
  mason: ["hombre", "barba", "castanio", "izquierda", "tez_clara"],
};

let posibles = new Set(Object.keys(caracteristicas_por_personaje));
let preguntasHechas = new Set();
let preguntasCount = 0;
let tiempoInicio = Date.now();

window.preguntar = async function(filtro) {
  console.log(`🔍 Preguntando: ${filtro}`);
  
  try {
    const res = await fetch("/preguntar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta: filtro, posibles: Array.from(posibles) }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    posibles = new Set(data.posibles.map((p) => p.toLowerCase()));
    preguntasHechas.add(filtro);
    preguntasCount++;
    
    console.log(`Posibles restantes: ${Array.from(posibles)}`);
    
    render();
    actualizarBotonesDisponibles();
    actualizarProgreso();
    verificarGanador();
    
  } catch (error) {
    console.error("Error en preguntar:", error);
    showToast("Error al hacer la pregunta", "error");
  }
};

window.reiniciarJuego = async function() {
  console.log("Reiniciando juego...");
  
  try {
    const res = await fetch("/reiniciar", { method: "POST" });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.error || "Error al reiniciar");
    }

    posibles = new Set(Object.keys(caracteristicas_por_personaje));
    preguntasHechas.clear();
    preguntasCount = 0;
    tiempoInicio = Date.now();
    
    render();
    actualizarBotonesDisponibles();
    actualizarProgreso();
    
    showToast("¡Nuevo juego iniciado!", "success");
    
  } catch (error) {
    console.error("Error al reiniciar:", error);
    showToast("Error al reiniciar el juego", "error");
  }
};

window.cerrarModal = function() {
  const modal = document.getElementById("modal-ganador");
  modal.classList.add("hidden");
};

window.cerrarModalYReiniciar = function() {
  cerrarModal();
  reiniciarJuego();
};

function actualizarBotonesDisponibles() {
  const botones = document.querySelectorAll("button[onclick^='preguntar']");
  botones.forEach((boton) => {
    const filtro = boton.getAttribute("onclick").match(/'([^']+)'/)[1];
    
    if (preguntasHechas.has(filtro)) {
      boton.disabled = true;
      boton.style.opacity = "0.5";
      return;
    }
    
    if ((filtro === 'mujer' || filtro === 'hombre') && 
        (preguntasHechas.has('mujer') || preguntasHechas.has('hombre'))) {
      boton.disabled = true;
      boton.style.opacity = "0.5";
      return;
    }
    
    const aunPosible = Array.from(posibles).some((p) =>
      caracteristicas_por_personaje[p]?.includes(filtro)
    );
    
    if (!aunPosible) {
      boton.disabled = true;
      boton.style.opacity = "0.5";
    } else {
      boton.disabled = false;
      boton.style.opacity = "1";
    }
  });
}

function verificarGanador() {
  if (posibles.size === 1) {
    const ganador = Array.from(posibles)[0];
    mostrarModalGanador(ganador);
  }
}

function mostrarModalGanador(ganador) {
  const modal = document.getElementById("modal-ganador");
  const personajeGanador = document.getElementById("personaje-ganador");
  const finalQuestions = document.getElementById("final-questions");
  const finalTime = document.getElementById("final-time");
  
  const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
  const minutos = Math.floor(tiempoTranscurrido / 60);
  const segundos = tiempoTranscurrido % 60;
  
  personajeGanador.textContent = ganador.charAt(0).toUpperCase() + ganador.slice(1);
  finalQuestions.textContent = `${preguntasCount} preguntas`;
  finalTime.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  
  modal.classList.remove("hidden");
  
  const botones = document.querySelectorAll("button[onclick^='preguntar']");
  botones.forEach(boton => {
    boton.disabled = true;
    boton.style.opacity = "0.5";
  });
}

function actualizarProgreso() {
  const totalPersonajes = Object.keys(caracteristicas_por_personaje).length;
  const personajesEliminados = totalPersonajes - posibles.size;
  const progreso = (personajesEliminados / totalPersonajes) * 100;
  
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) {
    progressFill.style.width = `${progreso}%`;
  }
}
function render() {
  const contenedor = document.getElementById("personajes-grid");
  if (!contenedor) {
    console.error(" No se encontró el contenedor de personajes");
    return;
  }
  
  contenedor.innerHTML = "";

  for (const personaje in caracteristicas_por_personaje) {
    const div = document.createElement("div");
    
    div.className = "card-flip rounded-lg overflow-hidden transition-all shadow-lg relative";

    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    const cardFront = document.createElement("div");
    cardFront.className = "card-front";

    const img = document.createElement("img");
    img.src = `/static/img/personajes/${personaje}.png`;
    img.alt = personaje;
    img.className = "w-full h-full object-cover transition-all";

    img.onerror = function() {
      this.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="240" viewBox="0 0 200 240"><rect width="200" height="240" fill="%23ffd93d"/><text x="100" y="120" text-anchor="middle" dy=".3em" fill="%23333" font-family="Arial" font-size="16" font-weight="bold">${personaje.toUpperCase()}</text></svg>`;
    };

    const cardBack = document.createElement("div");
    cardBack.className = "card-back";
    cardBack.innerHTML = `
      <div class="text-center">
        <div class="text-4xl mb-2">❌</div>
        <div class="text-sm font-semibold">ELIMINADO</div>
      </div>
    `;

    cardFront.appendChild(img);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    div.appendChild(cardInner);

    if (!posibles.has(personaje)) {
      div.classList.add("card-flipped");
      
      setTimeout(() => {
        div.classList.add("opacity-75", "scale-95");
      }, 400); 
      
    }

    contenedor.appendChild(div);
  }

  console.log(`Renderizados ${Object.keys(caracteristicas_por_personaje).length} personajes, ${posibles.size} activos`);
}


function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg transform transition-all duration-300 translate-x-full z-50`;
  
  switch(type) {
    case "success":
      toast.classList.add("bg-green-500");
      break;
    case "error":
      toast.classList.add("bg-red-500");
      break;
    default:
      toast.classList.add("bg-blue-500");
  }
  
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove("translate-x-full");
  }, 100);
  
  setTimeout(() => {
    toast.classList.add("translate-x-full");
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM cargado, inicializando juego...");
  
  const grid = document.getElementById("personajes-grid");
  const modal = document.getElementById("modal-ganador");
  
  if (!grid) {
    console.error("No se encontró el grid de personajes");
    return;
  }
  
  if (!modal) {
    console.error("No se encontró el modal");
    return;
  }
  
  render();
  actualizarBotonesDisponibles();
  actualizarProgreso();
  
  console.log("Juego inicializado correctamente");
  showToast("¡Juego iniciado! Haz tu primera pregunta", "success");
  
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      cerrarModal();
    }
  });
});