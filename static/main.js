const caracteristicas_por_personaje = {
  sidney: ["mujer", "gorro", "pelo_largo", "pelirrojo", "izquierda", "tez_clara"],
  olivia: ["mujer", "multicolor", "derecha", "tez_morena", "afro"],
  amy: ["mujer", "accesorios", "lentes", "pelo_corto", "pelo_suelto", "derecha", "tez_clara", "multicolor"],
  laura: ["mujer", "accesorios", "pelo_largo", "aretes", "pelo_suelto", "negro", "ondulado", "izquierda", "tez_morena"],
  maya: ["mujer", "pelo_largo", "pelirrojo", "izquierda", "tez_clara"],
  sam: ["mujer", "pelo_largo", "pelo_suelto", "negro", "ondulado", "izquierda", "tez_morena"],
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
  try {
    const res = await fetch("/preguntar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta: filtro, posibles: Array.from(posibles) }),
    });

    const data = await res.json();
    posibles = new Set(data.posibles.map(p => p.toLowerCase()));
    render();
    actualizarBotonesDisponibles();
    verificarGanador();
  } catch (error) {
    console.error("❌ Error al hacer la pregunta:", error);
    alert("Error al consultar. Intenta de nuevo.");
  }
}

function actualizarBotonesDisponibles() {
  document.querySelectorAll("button[onclick^='preguntar']").forEach(boton => {
    const filtro = boton.getAttribute("onclick").match(/'([^']+)'/)[1];
    const aunPosible = Array.from(posibles).some(p =>
      caracteristicas_por_personaje[p]?.includes(filtro)
    );
    boton.disabled = !aunPosible;
  });
}

function verificarGanador() {
  if (posibles.size === 1) {
    const ganador = Array.from(posibles)[0];
    setTimeout(() => {
      alert("🎉 ¡El personaje es: " + ganador.charAt(0).toUpperCase() + ganador.slice(1) + "!");
    }, 200); // Un pequeño retraso para renderizar primero
  }
}

function render() {
  const contenedor = document.getElementById("personajes-grid");
  contenedor.innerHTML = "";

  for (const personaje in caracteristicas_por_personaje) {
    const div = document.createElement("div");
    div.className = "card";
    if (!posibles.has(personaje)) div.classList.add("eliminado");

    const img = document.createElement("img");
    img.src = `/static/img/personajes/${personaje}.png`;
    img.alt = personaje;
    img.classList.add("personaje-img");

    div.appendChild(img);
    contenedor.appendChild(div);
  }
}

async function reiniciarJuego() {
  try {
    const res = await fetch("/reiniciar", { method: "POST" });
    const data = await res.json();

    if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo reiniciar");

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

window.onload = () => {
  render();
  actualizarBotonesDisponibles();
  document.getElementById("btn-reiniciar").addEventListener("click", reiniciarJuego);
};