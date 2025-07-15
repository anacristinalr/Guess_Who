const caracteristicas_por_personaje = {
  ethan: ["hombre", "aretes", "negro", "derecha", "tez_clara", "ondulado", "adulto", "polo", "occidental"],
  sidney: ["mujer", "pelo_largo", "gorro", "pelirrojo", "izquierda", "tez_clara", "liso", "adulto", "polo", "occidental"],
  olivia: ["mujer", "pelo_largo", "multicolor", "derecha", "tez_morena", "afro", "adulto", "polo", "afrodescendiente"],
  diego: ["hombre", "negro", "izquierda", "tez_clara", "liso", "adulto", "polo", "occidental"],
  theo: ["hombre", "gorro", "castanio", "izquierda", "tez_clara", "liso", "adulto", "chompa", "occidental"],
  dylan: ["hombre", "negro", "derecha", "tez_clara", "liso", "copete", "adulto", "polo", "occidental"],
  laura: ["mujer", "pelo_largo", "aretes", "pelo_suelto", "negro", "izquierda", "tez_morena", "ondulado", "adulto", "chompa", "occidental"],
  jasper: ["hombre", "lentes", "rubio", "izquierda", "tez_clara", "liso", "copete", "adulto", "camisa", "occidental"],
  amy: ["mujer", "lentes", "pelo_corto", "pelo_suelto", "multicolor", "derecha", "tez_clara", "liso", "adulto", "chompa", "occidental"],
  maya: ["mujer", "pelo_largo", "pelirrojo", "izquierda", "tez_clara", "liso", "adulto", "chompa", "occidental"],
  marcus: ["hombre", "rubio", "derecha", "tez_morena", "liso", "corte_militar", "adulto", "polo", "afrodescendiente"],
  luke: ["hombre", "lentes", "castanio", "izquierda", "tez_clara", "liso", "adulto", "polo", "occidental"],
  sam: ["mujer", "pelo_largo", "pelo_suelto", "negro", "izquierda", "tez_morena", "ondulado", "adulto", "chompa", "afrodescendiente"],
  mason: ["hombre", "barba", "castanio", "izquierda", "tez_clara", "liso", "adulto", "polo", "occidental"],
  zara: ["mujer", "pelo_corto", "rubio", "izquierda", "tez_clara", "liso", "adulto", "caffarena", "occidental"],
  jack: ["hombre", "pelo_corto", "negro", "derecha", "tez_clara", "liso", "copete", "adulto", "polo", "occidental"],
  angelina: ["mujer", "pelo_largo", "aretes", "pelo_suelto", "negro", "izquierda", "tez_clara", "liso", "adulto", "polo", "occidental"],
  renzo: ["hombre", "pelo_corto", "castanio", "izquierda", "tez_clara", "liso", "adulto", "polo", "occidental"],
  ana: ["mujer", "lentes", "pelo_largo", "pelo_suelto", "negro", "izquierda", "tez_clara", "ondulado", "adulto", "chompa", "occidental"],
  ben: ["hombre", "lentes", "gris", "frente", "tez_clara", "adulto_mayor", "camisa", "calvo", "occidental", "bigote"],
  lily: ["mujer", "pelo_largo", "gorro", "pelo_suelto", "castanio", "izquierda", "tez_clara", "liso", "adulto", "polo", "asiatico"],
  brian: ["hombre", "derecha", "tez_clara", "adulto", "polo", "calvo", "occidental"],
  george: ["hombre", "pelo_corto", "rubio", "frente", "tez_clara", "liso", "infante", "chompa", "occidental"],
  namjoon: ["hombre", "pelo_corto", "gris", "izquierda", "tez_clara", "liso", "copete", "adulto", "caffarena", "asiatico"],
  minjeong: ["mujer", "pelo_largo", "aretes", "pelo_suelto", "castanio", "izquierda", "tez_clara", "liso", "adulto", "caffarena", "asiatico"],
  connor: ["hombre", "pelo_largo", "barba", "negro", "derecha", "tez_morena", "afro", "adulto", "polo", "afrodescendiente", "bigote"],
  susan: ["mujer", "lentes", "pelo_corto", "pelo_suelto", "gris", "derecha", "tez_clara", "ondulado", "adulto_mayor", "camisa", "occidental"],
  richard: ["hombre", "lentes", "pelo_corto", "gris", "derecha", "tez_clara", "adulto_mayor", "camisa", "calvo", "occidental"],
  mike: ["hombre", "pelo_corto", "gorro", "negro", "derecha", "tez_clara", "liso", "infante", "polo", "occidental"],
  charles: ["hombre", "pelo_corto", "negro", "derecha", "tez_morena", "afro", "corte_militar", "infante", "polo", "afrodescendiente"]
};

let posibles = new Set(Object.keys(caracteristicas_por_personaje));
let preguntasHechas = new Set();
let preguntasCount = 0;
let tiempoInicio = Date.now();
let personajesEnJuego = []; // Array para mantener los personajes seleccionados durante toda la partida

// Función para mostrar notificaciones toast
function showToast(message, type = "info") {
  // Crear elemento toast si no existe
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  // Crear toast
  const toast = document.createElement("div");
  toast.style.cssText = `
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  `;

  // Colores según el tipo
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    info: "#17a2b8",
    warning: "#ffc107"
  };
  
  toast.style.backgroundColor = colors[type] || colors.info;
  toast.textContent = message;

  // Agregar animación CSS si no existe
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  toastContainer.appendChild(toast);

  // Auto-eliminar después de 3 segundos
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

window.preguntar = async function (filtro) {
  console.log(`🔍 Preguntando: ${filtro}`);

  try {
    const res = await fetch("/preguntar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pregunta: filtro,
        posibles: Array.from(posibles),
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    posibles = new Set(data.posibles.map((p) => p.toLowerCase()));
    preguntasHechas.add(filtro);
    preguntasCount++;

    console.log(`Posibles restantes: ${Array.from(posibles)}`);

    await render();
    actualizarBotonesDisponibles();
    actualizarProgreso();
    verificarGanador();
  } catch (error) {
    console.error("Error en preguntar:", error);
    showToast("Error al hacer la pregunta", "error");
  }
};

window.reiniciarJuego = async function () {
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
    personajesEnJuego = []; // Limpiar personajes seleccionados para nueva partida

    await render();
    actualizarBotonesDisponibles();
    actualizarProgreso();

    showToast("¡Nuevo juego iniciado!", "success");
  } catch (error) {
    console.error("Error al reiniciar:", error);
    showToast("Error al reiniciar el juego", "error");
  }
};

window.cerrarModal = function () {
  const modal = document.getElementById("modal-ganador");
  modal.classList.add("hidden");
};

window.cerrarModalYReiniciar = function () {
  cerrarModal();
  reiniciarJuego();
};

function actualizarBotonesDisponibles() {
  const botones = document.querySelectorAll("button[onclick^='preguntar']");
  if (
    preguntasHechas.size === 0 &&
    posibles.size === Object.keys(caracteristicas_por_personaje).length
  ) {
    botones.forEach((boton) => {
      boton.disabled = false;
      boton.style.opacity = "1";
    });
    return;
  }

  botones.forEach((boton) => {
    const filtro = boton.getAttribute("onclick").match(/'([^']+)'/)[1];

    if (preguntasHechas.has(filtro)) {
      boton.disabled = true;
      boton.style.opacity = "0.5";
      return;
    }

    if (
      (filtro === "mujer" || filtro === "hombre") &&
      (preguntasHechas.has("mujer") || preguntasHechas.has("hombre"))
    ) {
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
  // Verificar solo entre los personajes que están en el juego actual
  const posiblesEnJuego = personajesEnJuego.filter(personaje => posibles.has(personaje));
  
  if (posiblesEnJuego.length === 1) {
    const ganador = posiblesEnJuego[0];
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

  personajeGanador.textContent =
    ganador.charAt(0).toUpperCase() + ganador.slice(1);
  finalQuestions.textContent = `${preguntasCount} preguntas`;
  finalTime.textContent = `${minutos}:${segundos.toString().padStart(2, "0")}`;

  modal.classList.remove("hidden");

  const botones = document.querySelectorAll("button[onclick^='preguntar']");
  botones.forEach((boton) => {
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

async function render() {
  const contenedor = document.getElementById("personajes-grid");
  if (!contenedor) {
    console.error("No se encontró el contenedor de personajes");
    return;
  }

  contenedor.innerHTML = "";

  try {
    // Si no hay personajes en juego, seleccionarlos una sola vez
    if (personajesEnJuego.length === 0) {
      // Obtener todos los personajes de tu objeto
      const todosLosPersonajes = Object.keys(caracteristicas_por_personaje);

      // Obtener personaje secreto desde backend
      const secretoRes = await fetch("/personaje_secreto");
      const secretoData = await secretoRes.json();

      // Ajusta según tu backend; aquí asumo que responde { personaje: "nombre" }
      const personajeSecreto = secretoData.personaje?.toLowerCase() || secretoData.personaje_secreto?.toLowerCase();

      if (!personajeSecreto) {
        console.error("No se recibió personaje secreto del backend");
        return;
      }

      // Construir el set con personaje secreto + 14 aleatorios
      let seleccionados = new Set();
      seleccionados.add(personajeSecreto);

      while (seleccionados.size < 15) {
        const aleatorio = todosLosPersonajes[Math.floor(Math.random() * todosLosPersonajes.length)];
        seleccionados.add(aleatorio);
      }

      // Convertir a array, mezclar y guardar
      personajesEnJuego = Array.from(seleccionados).sort(() => 0.5 - Math.random());
    }

    // Mostrar los personajes ya seleccionados
    for (const personaje of personajesEnJuego) {
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

      img.onerror = function () {
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

      // Marca como volteado si fue eliminado
      if (!posibles.has(personaje)) {
        div.classList.add("card-flipped");
        setTimeout(() => {
          div.classList.add("opacity-75", "scale-95");
        }, 400);
      }

      contenedor.appendChild(div);
    }

    console.log(`Renderizados ${personajesEnJuego.length} personajes, ${posibles.size} activos`);
  } catch (error) {
    console.error("Error en render:", error);
    showToast("Error al cargar personajes", "error");
  }
}

// Evento DOMContentLoaded con llamada await a render
document.addEventListener("DOMContentLoaded", async function () {
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

  await render(); // ¡No olvides el await!

  actualizarBotonesDisponibles();
  actualizarProgreso();

  console.log("Juego inicializado correctamente");
  showToast("¡Juego iniciado! Haz tu primera pregunta", "success");

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      cerrarModal();
    }
  });
});
