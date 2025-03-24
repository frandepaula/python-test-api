from flask import Flask, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  

def format_cpf(cpf: str) -> str:
    return re.sub(r"\D", "", cpf) 

def load_blacklist():
    try:
        with open("blacklist.txt", "r") as file:
            return set(format_cpf(line.strip()) for line in file.readlines())  # Remove formatação
    except FileNotFoundError:
        return set()

BLACKLIST = load_blacklist()

@app.route("/<cpf>", methods=["GET"])
def check_cpf(cpf):
    cpf_formatado = format_cpf(cpf)  # Normaliza a entrada antes de comparar
    if cpf_formatado in BLACKLIST:
        return jsonify({"status": "BLOCK"})
    return jsonify({"status": "FREE"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
