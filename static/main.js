let TODOS_PERSONAJES_DISPONIBLES = [
  "ethan", "sidney", "olivia", "diego", "theo", "dylan", "laura", "jasper", 
  "amy", "maya", "marcus", "luke", "sam", "mason", "zara", "jack", "angelina", 
  "renzo", "ana", "ben", "lily", "brian", "george", "namjoon", "minjeong", 
  "connor", "susan", "richard", "mike", "charles"
]; 

let PERSONAJES_EN_JUEGO = [];
let posibles = new Set();
let preguntasHechas = new Set();
let preguntasCount = 0;
let tiempoInicio = Date.now();


async function cargarTodosPersonajes() {
  try {
    const response = await fetch("/todos_personajes");
    if (response.ok) {
      const data = await response.json();
      TODOS_PERSONAJES_DISPONIBLES = data.personajes;
      console.log(`📚 Cargados ${TODOS_PERSONAJES_DISPONIBLES.length} personajes disponibles`);
    }
  } catch (error) {
    console.warn("⚠️ No se pudieron cargar todos los personajes, usando fallback");
  }
}

window.preguntar = async function(filtro) {
  console.log(`\n🔍 PREGUNTANDO: ${filtro}`);
  console.log(`📋 Posibles antes (${posibles.size}):`, Array.from(posibles).slice(0, 5));
  
  if (preguntasHechas.has(filtro)) {
    mostrarToast("Ya hiciste esta pregunta", "warning");
    return;
  }
  
  try {
    const response = await fetch("/preguntar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        pregunta: filtro, 
        posibles: Array.from(posibles) 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`📊 Response:`, data);
    
    if (data.error) {
      throw new Error(data.error);
    }

    preguntasHechas.add(filtro);
    preguntasCount++;
    posibles = new Set(data.posibles.map(p => p.toLowerCase()));
    
    console.log(`✅ Respuesta: ${data.respuesta}`);
    console.log(`📊 Eliminados: ${data.eliminados?.length || 0}`);
    console.log(`📋 Posibles después (${posibles.size}):`, Array.from(posibles).slice(0, 5));
    
    const respuestaTexto = data.respuesta === "SÍ" ? "¡SÍ!" : "No";
    mostrarToast(`${respuestaTexto} - ${posibles.size} personajes restantes`, 
                 data.respuesta === "SÍ" ? "success" : "info");
    
    renderPersonajes();
    actualizarBotones();
    actualizarProgreso();
    
    if (posibles.size === 1) {
      const ganador = Array.from(posibles)[0];
      setTimeout(() => mostrarGanador(ganador), 500);
    } else if (posibles.size === 0) {
      mostrarToast("¡Error! No quedan personajes posibles", "error");
    }
    
  } catch (error) {
    console.error("💥 ERROR:", error);
    mostrarToast(`Error: ${error.message}`, "error");
  }
};

window.reiniciarJuego = async function() {
  console.log("🔄 REINICIANDO CON PERSONAJES ALEATORIOS...");
  
  try {
    const response = await fetch("/reiniciar", { method: "POST" });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.error);
    }
    
    PERSONAJES_EN_JUEGO = data.personajes_juego || [];
    posibles = new Set(PERSONAJES_EN_JUEGO.map(p => p.toLowerCase()));
    preguntasHechas.clear();
    preguntasCount = 0;
    tiempoInicio = Date.now();
    
    console.log(`🎲 Nuevos personajes aleatorios: ${PERSONAJES_EN_JUEGO}`);
    console.log(`🎯 Total en este juego: ${PERSONAJES_EN_JUEGO.length}`);
    
    renderPersonajes();
    actualizarBotones();
    actualizarProgreso();
    
    mostrarToast(`¡Nuevo juego!`, "success");
    
  } catch (error) {
    console.error("💥 ERROR AL REINICIAR:", error);
    mostrarToast(`Error: ${error.message}`, "error");


    PERSONAJES_EN_JUEGO = TODOS_PERSONAJES_DISPONIBLES.slice(0, 15);
    posibles = new Set(PERSONAJES_EN_JUEGO);
    renderPersonajes();
  }
};

function renderPersonajes() {
  const grid = document.getElementById("personajes-grid");
  if (!grid) return;
  
  grid.innerHTML = ""; 
  
  PERSONAJES_EN_JUEGO.forEach(personaje => {
    const div = document.createElement("div");
    
    div.className = "card-flip rounded-lg overflow-hidden transition-all shadow-lg relative";
    
    const isActive = posibles.has(personaje.toLowerCase());
    
    if (isActive && posibles.size <= 3) {
      div.onclick = () => adivinarPersonaje(personaje);
      div.classList.add("ring-2", "ring-green-500", "cursor-pointer");
    }
    
    div.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="/static/img/personajes/${personaje}.png" 
               alt="${personaje}" 
               class="w-full h-full object-cover transition-all"
               onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"200\\" height=\\"240\\" viewBox=\\"0 0 200 240\\"><rect width=\\"200\\" height=\\"240\\" fill=\\"%23ffd93d\\"/><text x=\\"100\\" y=\\"120\\" text-anchor=\\"middle\\" dy=\\".3em\\" fill=\\"%23333\\" font-family=\\"Arial\\" font-size=\\"16\\" font-weight=\\"bold\\">${personaje.toUpperCase()}</text></svg>'">
        </div>
        <div class="card-back">
          <div class="text-white h-full flex items-center justify-center">
            <div class="text-center">
              <div class="text-4xl mb-2">❌</div>
              <div class="text-sm font-semibold">ELIMINADO</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    if (!isActive) {
      div.classList.add("card-flipped", "opacity-75", "scale-95");
      setTimeout(() => {
        div.classList.add("animate-pulse");
      }, 400);
    }
    
    grid.appendChild(div);
  });
  
  console.log(`✅ Renderizados ${PERSONAJES_EN_JUEGO.length} personajes, ${posibles.size} activos`);
}

function actualizarProgreso() {
  const total = PERSONAJES_EN_JUEGO.length || 1; // Evitar división por 0
  const progreso = ((total - posibles.size) / total) * 100;
  const progressBar = document.getElementById("progress-fill");
  if (progressBar) {
    progressBar.style.width = `${progreso}%`;
  }
}

window.adivinarPersonaje = async function(personaje) {
  console.log(` ADIVINANDO: ${personaje}`);
  
  try {
    const response = await fetch("/adivinar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personaje: personaje }),
    });

    const data = await response.json();
    
    if (data.correcto) {
      mostrarGanador(data.personaje_secreto);
    } else {
      mostrarToast(data.mensaje, "error");
    }
    
  } catch (error) {
    console.error(" ERROR al adivinar:", error);
    mostrarToast(`Error: ${error.message}`, "error");
  }
};

function actualizarBotones() {
  const botones = document.querySelectorAll("button[onclick^='preguntar']");
  botones.forEach(boton => {
    const match = boton.getAttribute("onclick").match(/'([^']+)'/);
    if (!match) return;
    
    const filtro = match[1];
    const yaUsada = preguntasHechas.has(filtro);
    
    boton.disabled = yaUsada;
    boton.style.opacity = yaUsada ? "0.5" : "1";
    boton.style.cursor = yaUsada ? "not-allowed" : "pointer";
  });
}

function mostrarGanador(ganador) {
  const modal = document.getElementById("modal-ganador");
  const nombreEl = document.getElementById("personaje-ganador");
  const preguntasEl = document.getElementById("final-questions");
  const tiempoEl = document.getElementById("final-time");
  
  if (modal && nombreEl && preguntasEl) {
    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;
    
    nombreEl.textContent = ganador.toUpperCase();
    preguntasEl.textContent = `${preguntasCount} preguntas`;
    if (tiempoEl) {
      tiempoEl.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
    }
    
    modal.classList.remove("hidden");
    actualizarBotones();
  }
}

function mostrarToast(mensaje, tipo = "info") {
  const colores = {
    success: "bg-green-500",
    error: "bg-red-500", 
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  };
  
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 ${colores[tipo]} text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
  toast.textContent = mensaje;
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.remove("translate-x-full"), 100);
  setTimeout(() => {
    toast.classList.add("translate-x-full");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

window.cerrarModal = () => {
  document.getElementById("modal-ganador").classList.add("hidden");
};

window.cerrarModalYReiniciar = () => {
  cerrarModal();
  reiniciarJuego();
};

document.addEventListener('DOMContentLoaded', async function() {
  console.log("🚀 Inicializando juego...");
  
  // Cargar todos los personajes disponibles
  await cargarTodosPersonajes();
  
  // Iniciar primer juego
  await reiniciarJuego();
  
  mostrarToast("¡Juego listo! Haz tu primera pregunta", "success");
});