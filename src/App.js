import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import Statistique from './Statistique';
import StatReseau from './StatReseau';
import { useState, useEffect } from 'react';
import Recherche from './Recherche';
import DetailLigne from './DetailLigne';



function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");  
  const lignesFiltrees = lignes.filter((ligne) =>
     ligne.depart.toLowerCase().includes(recherche.toLowerCase()) ||
     ligne.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
     ligne.numero.includes(recherche) );
  
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);
  

function chargerLignes() {
  setChargement(true);

  fetch("http://127.0.0.1:5001/lignes")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Erreur serveur : " + response.status
        );
      }
      return response.json();
    })
    .then((data) => {
      setLignes(data);
      setChargement(false);
    })
    .catch((error) => {
      setErreur(error.message);
      setChargement(false);
    });
}

useEffect(() => {
  chargerLignes();
}, []);

  if (chargement) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <p className="message-chargement">
          Chargement des lignes...
        </p>
      </main>
    </div>
  );
}

if (erreur) {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <div className="message-erreur">
          <p>Impossible de charger les lignes.</p>

          <p className="erreur-detail">
            {erreur}
          </p>

          <p>
            Vérifiez que le serveur Flask est lancé.
          </p>
        </div>
      </main>
    </div>
  );
}

function chargerDetailsLigne(id) {
  fetch(`http://127.0.0.1:5001/lignes/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Impossible de charger la ligne");
      }

      return response.json();
    })
    .then((data) => {
      setLigneSelectionnee(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

return (
    <div className="App">
      <Header />
      <main className="contenu">
        <StatReseau lignes={lignes} />
        
        <Recherche
          recherche={recherche}
          setRecherche={setRecherche}
          setNbRecherches={setNbRecherches}
       />
        <button onClick={chargerLignes}>
          Recharger
        </button>
  <p>Vous avez effectué {nbRecherches} recherche(s)</p>
        

{lignesFiltrees.length === 0 && (
  <p>Aucune ligne trouvée</p> )}

        <ListeLignes
  lignes={lignesFiltrees}
  chargerDetailsLigne={chargerDetailsLigne}
  ligneSelectionnee={ligneSelectionnee}
       />

{ligneSelectionnee && (
  <DetailLigne ligne={ligneSelectionnee} /> )}
        
      </main>
      <Footer />
      <Statistique />
    </div>
  );
  

}


export default App;