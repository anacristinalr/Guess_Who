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

    posibles_prolog = [p.lower().strip('"').strip("'") for p in posibles]
    posibles_str = "[" + ",".join(posibles_prolog) + "]"
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
        return jsonify({"posibles": []}), 500

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
