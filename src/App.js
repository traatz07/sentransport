import './App.css';
import Header from './Header';
import ListeLignes from './ListeLignes';
import Footer from './Footer';
import Statistique from './Statistique';
import StatReseau from './StatReseau';
import { useState } from 'react';
import Recherche from './Recherche';
import DetailLigne from './DetailLigne';



function App() {
  const lignes = [
  {
    id: 1,
    numero: "1",
    depart: "Parcelles Assainies",
    arrivee: "Plateau",
    arrets: 14,
    couleur: "#2ecc71",
    listeArrets: ["Parcelles U14", "Parcelles U10", "Camberene", "Patte d'Oie", "Grand Dakar", "Colobane", "Ponty", "Plateau"]
  },

  {
    id: 2,
    numero: "7",
    depart: "Guediawaye",
    arrivee: "Place Obel",
    arrets: 18,
    couleur: "#3498db",
    listeArrets: ["Guediawaye", "Pikine", "Thiaroye", "Keur Massar", "Grand Yoff", "Parcelles", "Liberte 6", "Place Obel"]
  },

  {
    id: 3,
    numero: "15",
    depart: "Pikine",
    arrivee: "Medina",
    arrets: 12,
    couleur: "#e73cbf",
    listeArrets: ["Pikine Centre", "Thiaroye Gare", "Hann", "Colobane", "Fass", "Medina"]
  },

  {
    id: 4,
    numero: "23",
    depart: "Ouakam",
    arrivee: "Grand Dakar",
    arrets: 10,
    couleur: "#ecc021",
    listeArrets: ["Ouakam Village", "Mermoz", "Fann", "Point E", "Liberte 5", "Grand Dakar"]
  },

  {
    id: 5,
    numero: "8",
    depart: "Almadies",
    arrivee: "Colobane",
    arrets: 16,
    couleur: "#4604cb",
    listeArrets: ["Almadies", "Ngor", "Yoff", "Ouest Foire", "Liberte 6", "Colobane"]
  },

  {
    id: 6,
    numero: "12",
    depart: "Yoff",
    arrivee: "Sandaga",
    arrets: 11,
    couleur: "#e67e22",
    listeArrets: ["Yoff Village", "Aeroport LSS", "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"]
  },

  {
    id: 7,
    numero: "20",
    depart: "Fann",
    arrivee: "Liberte 6",
    arrets: 10,
    couleur: "#9b59b6",
    listeArrets: ["Fann", "Point E", "Mermoz", "Sacre Coeur", "Liberte 5", "Liberte 6"]
  },

  {
    id: 8,
    numero: "25",
    depart: "Medina",
    arrivee: "HLM",
    arrets: 8,
    couleur: "#f31212",
    listeArrets: ["Medina", "Fass", "Colobane", "Castors", "HLM"]
  },

  {
    id: 9,
    numero: "30",
    depart: "Dieuppeul",
    arrivee: "Sicap",
    arrets: 13,
    couleur: "#1abc9c",
    listeArrets: ["Dieuppeul", "Castors", "Amitie", "Sacre Coeur", "Sicap"]
  },

  {
    id: 10,
    numero: "40",
    depart: "Ouakam",
    arrivee: "Plateau",
    arrets: 16,
    couleur: "#34495e",
    listeArrets: ["Ouakam", "Mamelles", "Fann", "Colobane", "Avenue Bourguiba", "Plateau"]
  }
];
   const [recherche, setRecherche] = useState("");
   const lignesFiltrees = lignes.filter((ligne) =>
     ligne.depart.toLowerCase().includes(recherche.toLowerCase()) ||
     ligne.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
     ligne.numero.includes(recherche) );
  
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nbRecherches, setNbRecherches] = useState(0);
  
function handleClickLigne(ligne) {
    if (
      ligneSelectionnee &&
      ligneSelectionnee.id === ligne.id
    ) {
      setLigneSelectionnee(null);
    } else {
      setLigneSelectionnee(ligne);
    }
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

  <p>Vous avez effectué {nbRecherches} recherche(s)</p>
        

{lignesFiltrees.length === 0 && (
  <p>Aucune ligne trouvée</p> )}

        <ListeLignes
          lignes={lignesFiltrees}
          setLigneSelectionnee={setLigneSelectionnee}
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