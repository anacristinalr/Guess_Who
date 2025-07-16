from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pyswip import Prolog
import random

app = Flask(__name__, static_folder="static")
CORS(app)

prolog = Prolog()
PROLOG_FILE = "adivinaquien.pl"
personaje_secreto = None

def cargar_prolog():
    try:
        prolog.consult(PROLOG_FILE)
        print("[✔] Archivo Prolog cargado correctamente.")
    except Exception as e:
        print(f"[❌ Error al cargar Prolog]: {e}")

def asignar_personaje_secreto():
    global personaje_secreto
    try:
        # ✅ Usar el nuevo predicado que funciona
        resultados = list(prolog.query("personaje(P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _)."))
        personajes = [str(p["P"]) for p in resultados]
        if personajes:
            personaje_secreto = random.choice(personajes)
            print(f"[✔] Personaje secreto asignado: {personaje_secreto}")
        else:
            print("[❌] No se encontraron personajes en Prolog.")
    except Exception as e:
        print(f"[❌ Error al asignar personaje secreto]: {e}")

cargar_prolog()
asignar_personaje_secreto()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/preguntar", methods=["POST"])
def preguntar():
    global personaje_secreto
    
    if not personaje_secreto:
        return jsonify({"error": "No hay personaje secreto asignado"}), 500
    
    data = request.get_json()
    pregunta = data.get("pregunta", "").lower().strip()
    posibles = data.get("posibles", [])

    print(f"\n[🔍 NUEVA PREGUNTA]")
    print(f"Pregunta: '{pregunta}'")
    print(f"Personaje secreto: {personaje_secreto}")
    print(f"Posibles actuales: {len(posibles)} personajes")

    try:
        consulta_secreto = f"filtrar({pregunta}, [{personaje_secreto}], Resultado)"
        print(f"Consulta para secreto: {consulta_secreto}")
        
        resultado_secreto = list(prolog.query(consulta_secreto))
        secreto_cumple = len(resultado_secreto) > 0 and len(resultado_secreto[0]["Resultado"]) > 0
        
        print(f"¿El secreto cumple '{pregunta}'? {secreto_cumple}")
        
        todos_personajes = [str(p["P"]) for p in prolog.query("personaje(P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _).")]
        consulta_todos = f"filtrar({pregunta}, {str(todos_personajes).replace("'", "")}, TodosConCaracteristica)"
        
        resultado_todos = list(prolog.query(consulta_todos))
        personajes_con_caracteristica = []
        if resultado_todos and "TodosConCaracteristica" in resultado_todos[0]:
            personajes_con_caracteristica = [str(p) for p in resultado_todos[0]["TodosConCaracteristica"]]
        
        print(f"Personajes que SÍ tienen '{pregunta}': {personajes_con_caracteristica}")
        
        posibles_actuales = [p.lower().strip() for p in posibles]
        
        if secreto_cumple:
            personajes_eliminados = [p for p in posibles_actuales if p not in personajes_con_caracteristica]
            nuevos_posibles = [p for p in posibles_actuales if p in personajes_con_caracteristica]
            respuesta = "SÍ"
        else:
            personajes_eliminados = [p for p in posibles_actuales if p in personajes_con_caracteristica]
            nuevos_posibles = [p for p in posibles_actuales if p not in personajes_con_caracteristica]
            respuesta = "NO"
        
        print(f"Respuesta: {respuesta}")
        print(f"Eliminados: {personajes_eliminados}")
        print(f"Nuevos posibles: {nuevos_posibles}")
        
        return jsonify({
            "posibles": nuevos_posibles,
            "respuesta": respuesta,
            "eliminados": personajes_eliminados,
            "personaje_secreto_cumple": secreto_cumple
        })

    except Exception as e:
        print(f"[❌ Error en consulta]: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/reiniciar", methods=["POST"])
def reiniciar():
    global personaje_secreto
    
    try:
        # ✅ Obtener TODOS los personajes disponibles
        resultados = list(prolog.query("personaje(P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _)."))
        todos_los_personajes = [str(p["P"]) for p in resultados]
        
        if len(todos_los_personajes) < 15:
            return jsonify({"ok": False, "error": "No hay suficientes personajes en la base de datos"}), 500

        # ✅ Elegir personaje secreto primero
        personaje_secreto = random.choice(todos_los_personajes)
        
        # ✅ Seleccionar 15 personajes aleatorios (incluyendo el secreto)
        personajes_seleccionados = set([personaje_secreto])
        
        # Agregar personajes aleatorios hasta llegar a 15
        while len(personajes_seleccionados) < 15:
            aleatorio = random.choice(todos_los_personajes)
            personajes_seleccionados.add(aleatorio)
        
        personajes_para_juego = list(personajes_seleccionados)
        random.shuffle(personajes_para_juego)  # Mezclar el orden
        
        print(f"\n[🔄 REINICIO]")
        print(f"Total personajes disponibles: {len(todos_los_personajes)}")
        print(f"Personajes seleccionados para el juego: {len(personajes_para_juego)}")
        print(f"Personaje secreto: {personaje_secreto}")
        print(f"Personajes en juego: {personajes_para_juego}")

        return jsonify({
            "ok": True, 
            "personajes_juego": personajes_para_juego,  # ✅ Solo 15 personajes aleatorios
            "total_disponibles": len(todos_los_personajes),
            "personaje_secreto_incluido": personaje_secreto in personajes_para_juego
        })

    except Exception as e:
        print(f"[❌ Error en reiniciar]: {e}")
        return jsonify({"ok": False, "error": str(e)}), 500

# ✅ Nuevo endpoint para obtener todos los personajes (opcional)
@app.route("/todos_personajes", methods=["GET"])
def obtener_todos_personajes():
    try:
        resultados = list(prolog.query("personaje(P, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _)."))
        todos_los_personajes = [str(p["P"]) for p in resultados]
        
        return jsonify({
            "personajes": todos_los_personajes,
            "total": len(todos_los_personajes)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/personaje_secreto", methods=["GET"])
def obtener_personaje_secreto():
    if personaje_secreto:
        return jsonify({"personaje_secreto": personaje_secreto})
    return jsonify({"error": "El personaje secreto no ha sido asignado."}), 404

@app.route("/adivinar", methods=["POST"])
def adivinar_personaje():
    """Endpoint para adivinar el personaje final"""
    global personaje_secreto
    
    data = request.get_json()
    adivinanza = data.get("personaje", "").lower().strip()
    
    print(f"\n[🎯 ADIVINANZA]")
    print(f"Jugador adivina: {adivinanza}")
    print(f"Personaje secreto: {personaje_secreto}")
    
    es_correcto = adivinanza == personaje_secreto.lower()
    
    return jsonify({
        "correcto": es_correcto,
        "personaje_secreto": personaje_secreto,
        "mensaje": "¡Correcto!" if es_correcto else f"Incorrecto. Era {personaje_secreto}"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)