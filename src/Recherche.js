import './Recherche.css';
function Recherche({ valeur, setRecherche, setNbRecherches , onChange }) {

  return (
    <div className="recherche">

      <input
      
        type="text"
        className="recherche-input"
        placeholder="Rechercher une ligne..."
        value={valeur}
        onChange={(e) => {
        setRecherche(e.target.value);
        setNbRecherches((prev) => prev + 1);
}}
      />

      <button onClick={() => setRecherche("")}>
        Effacer
      </button>

    </div>
  );
}

export default Recherche;