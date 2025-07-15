from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pyswip import Prolog
import os
import random

app = Flask(__name__)
CORS(app)

# Carga el archivo Prolog
prolog = Prolog()
try:
    prolog.consult("adivinaquien.pl")
    print("[✔] Archivo Prolog cargado correctamente.")
except Exception as e:
    print(f"[❌ Error al cargar Prolog]: {e}")

# Estado global
personaje_secreto = None

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/preguntar", methods=["POST"])
def preguntar():
    data = request.get_json()
    pregunta = data.get("pregunta", "").lower().strip()
    posibles = data.get("posibles", [])

    def limpiar_nombre(p):
        return ''.join(c for c in p.lower() if c.isalnum() or c == '_')

    posibles_prolog = [limpiar_nombre(p) for p in posibles]
    posibles_str = "[" + ",".join(posibles_prolog) + "]"

    # Mapeo de preguntas del frontend a Prolog
    pregunta_map = {
        "edad:infante": "infante",
        "edad:adulto": "adulto",
        "edad:adulto_mayor": "adulto_mayor",
        "etnia:asiatica": "asiatico",
        "etnia:occidental": "occidental",
        "etnia:afrodescendiente": "afrodescendiente",
        "de_frente": "frente"
    }
    pregunta = pregunta_map.get(pregunta, pregunta)
    if ":" in pregunta:
        pregunta = pregunta.split(":")[-1]

    if not pregunta.isidentifier():
        pregunta = f"'{pregunta}'"

    consulta = f"filtrar({pregunta}, {posibles_str}, Filtrados)"

    try:
        resultados = list(prolog.query(consulta))
        if resultados:
            filtrados = resultados[0]["Filtrados"]
            nombres_filtrados = [str(p) for p in filtrados]
        else:
            nombres_filtrados = []
    except Exception as e:
        print(f"[❌ Error en consulta Prolog]: {e}")
        print(f"[❌ Consulta enviada]: {consulta}")
        return jsonify({"posibles": [], "error": str(e), "consulta": consulta}), 500

    return jsonify({"posibles": nombres_filtrados})

@app.route("/reiniciar", methods=["POST"])
def reiniciar():
    global personaje_secreto

    try:
        resultados = list(prolog.query("personaje(P)."))
        personajes = [str(p["P"]) for p in resultados]
        if not personajes:
            print("[❌] No se encontraron personajes en Prolog. Verifica adivinaquien.pl")
            return jsonify({"ok": False, "error": "No se encontraron personajes en Prolog."}), 500
    except Exception as e:
        print(f"[❌ Error al obtener personajes]: {e}")
        return jsonify({"ok": False, "error": str(e)}), 500

    personaje_secreto = random.choice(personajes)
    print(f"[🔄 Reinicio] Personaje secreto: {personaje_secreto}")
    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(debug=True, port=5000)