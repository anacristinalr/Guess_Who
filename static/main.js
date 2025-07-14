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

async function preguntar(filtro) {
  const res = await fetch("/preguntar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pregunta: filtro, posibles: Array.from(posibles) }),
  });

  const data = await res.json();
  posibles = new Set(data.posibles.map((p) => p.toLowerCase()));
  render();
  actualizarBotonesDisponibles();
  verificarGanador();
}

function actualizarBotonesDisponibles() {
  const botones = document.querySelectorAll("button[onclick^='preguntar']");
  botones.forEach((boton) => {
    const filtro = boton.getAttribute("onclick").match(/'([^']+)'/)[1];
    const aunPosible = Array.from(posibles).some((p) =>
      caracteristicas_por_personaje[p]?.includes(filtro)
    );
    boton.disabled = !aunPosible;
  });
}

function verificarGanador() {
  if (posibles.size === 1) {
    const ganador = Array.from(posibles)[0];
    alert("¡El personaje es: " + ganador.charAt(0).toUpperCase() + ganador.slice(1) + "!");
  }
}

function render() {
  const contenedor = document.getElementById("personajes-grid");
  contenedor.innerHTML = "";

  for (const personaje in caracteristicas_por_personaje) {
    const div = document.createElement("div");
    div.className = "card";

    // Verificar si está eliminado
    if (!posibles.has(personaje)) {
      div.classList.add("eliminado");
    }

    // Crear la imagen
    const img = document.createElement("img");
    img.src = `/static/img/personajes/${personaje}.png`; // Asegúrate de servir estos archivos
    img.alt = personaje;
    img.classList.add("personaje-img");

    // Agregar al div
    div.appendChild(img);
    contenedor.appendChild(div);
  }
}

async function reiniciarJuego() {
  try {
    const res = await fetch("/reiniciar", { method: "POST" });

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error("La respuesta no es JSON válido");
    }

    if (!data.ok) {
      throw new Error(data.error || "Respuesta ok = false");
    }

    // ✅ Si todo va bien:
    posibles = new Set(Object.keys(caracteristicas_por_personaje));
    render();
    actualizarBotonesDisponibles();

    const mensajeDiv = document.getElementById("mensaje");
    if (mensajeDiv) {
      mensajeDiv.textContent = "¡Nuevo juego iniciado!";
      mensajeDiv.style.opacity = 1;
      setTimeout(() => {
        mensajeDiv.style.transition = "opacity 1s ease";
        mensajeDiv.style.opacity = 0;
      }, 2000);
    }
  } catch (err) {
    console.error("❌ Error en reiniciarJuego:", err.message);
    alert("❌ Error al reiniciar el juego.");
  }
}


// Inicialización
window.onload = () => {
  render();
  actualizarBotonesDisponibles();

  // ✅ Asegura que el DOM ya está cargado
  document.getElementById("btn-reiniciar").addEventListener("click", reiniciarJuego);
};