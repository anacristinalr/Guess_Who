from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pyswip import Prolog
import os
import random

app = Flask(__name__)
CORS(app)

# Carga el archivo Prolog
prolog = Prolog()
PROLOG_FILE = "adivinaquien.pl"
personaje_secreto = None

def cargar_prolog():
    try:
        prolog.consult(PROLOG_FILE)
        print("[✔] Archivo Prolog cargado correctamente.")
    except Exception as e:
        print(f"[❌ Error al cargar Prolog]: {e}")

cargar_prolog()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/preguntar", methods=["POST"])
def preguntar():
    data = request.get_json()

    pregunta = data.get("pregunta", "").strip().lower()
    posibles = data.get("posibles", [])

    if not pregunta or not isinstance(posibles, list):
        return jsonify({"error": "Entrada inválida"}), 400

    posibles_normalizados = [p.lower().strip('"').strip("'") for p in posibles]
    posibles_str = "[" + ",".join(posibles_normalizados) + "]"
    consulta = f"filtrar({pregunta}, {posibles_str}, Filtrados)"

    try:
        resultado = list(prolog.query(consulta))
        if resultado:
            filtrados = resultado[0]["Filtrados"]
            nombres_filtrados = [str(p) for p in filtrados]
        else:
            nombres_filtrados = []
        return jsonify({"posibles": nombres_filtrados})
    except Exception as e:
        print(f"[❌ Error en consulta Prolog]: {consulta}\n{e}")
        return jsonify({"error": "Error al procesar la consulta"}), 500

@app.route("/reiniciar", methods=["POST"])
def reiniciar():
    global personaje_secreto

    try:
        resultados = list(prolog.query("personaje(P)."))
        personajes = [str(p["P"]) for p in resultados]
        if not personajes:
            return jsonify({"ok": False, "error": "No se encontraron personajes en Prolog."}), 500
        personaje_secreto = random.choice(personajes)
        print(f"[🔄 Reinicio] Personaje secreto: {personaje_secreto}")
        return jsonify({"ok": True})
    except Exception as e:
        print(f"[❌ Error al obtener personajes]: {e}")
        return jsonify({"ok": False, "error": str(e)}), 500

@app.route("/personaje_secreto", methods=["GET"])
def obtener_personaje_secreto():
    if personaje_secreto:
        return jsonify({"personaje_secreto": personaje_secreto})
    return jsonify({"error": "El personaje secreto no ha sido asignado."}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
