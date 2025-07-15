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
        resultados = list(prolog.query("personaje(P)."))
        personajes = [str(p["P"]) for p in resultados]
        if personajes:
            personaje_secreto = random.choice(personajes)
            print(f"[✔] Personaje secreto inicial: {personaje_secreto}")
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
        return jsonify({"posibles": nombres_filtrados})
    except Exception as e:
        print(f"[❌ Error en consulta Prolog]: {e}")
        return jsonify({
            "error": f"Pregunta no válida o error en Prolog: {pregunta}",
            "posibles": []
        }), 500

@app.route("/reiniciar", methods=["POST"])
def reiniciar():
    global personaje_secreto
    try:
        resultados = list(prolog.query("personaje(P)."))
        personajes = [str(p["P"]) for p in resultados]
        if not personajes:
            print("[❌] No se encontraron personajes en Prolog.")
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
