import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les données depuis le fichier JSON
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>", "/arrets", "/stats", "/lignes/recherche?q=terme"]
    })

@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):

    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )

    if ligne is None:
        return jsonify({
            "erreur": "Ligne non trouvee"
        }), 404

    return jsonify(ligne)

@app.route("/arrets")
def get_arrets():

    tous_arrets = []

    for ligne in lignes:
        tous_arrets.extend(ligne["listeArrets"])

    arrets_uniques = list(set(tous_arrets))

    return jsonify(arrets_uniques)

@app.route("/stats")
def get_stats():

    total_lignes = len(lignes)

    total_arrets = sum(
        ligne["arrets"] for ligne in lignes
    )

    ligne_max = max(
        lignes,
        key=lambda ligne: ligne["arrets"]
    )

    return jsonify({
        "total_lignes": total_lignes,
        "total_arrets": total_arrets,
        "ligne_plus_arrets": ligne_max["numero"]
    })

@app.route("/lignes/recherche")
def rechercher_lignes():

    terme = request.args.get("q", "").lower()

    resultats = []

    for ligne in lignes:

        if (
            terme in ligne["depart"].lower()
            or terme in ligne["arrivee"].lower()
            or terme in ligne["numero"]
        ):

            resultats.append(ligne)

    return jsonify(resultats)

if __name__ == "__main__":
    app.run(debug=True, port=5000)