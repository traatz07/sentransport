from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

lignes = [
    {
        "id": 1,
        "numero": "1",
        "depart": "Parcelles Assainies",
        "arrivee": "Plateau",
        "arrets": 14
    },
    {
        "id": 2,
        "numero": "7",
        "depart": "Guediawaye",
        "arrivee": "Place Obel",
        "arrets": 18
    },
    {
        "id": 3,
        "numero": "15",
        "depart": "Pikine",
        "arrivee": "Medina",
        "arrets": 12
    }
]

@app.route('/lignes')
def get_lignes():
    return jsonify(lignes)

if __name__ == '__main__':
    app.run(debug=True)