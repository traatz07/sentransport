import './StatReseau.css';

function StatReseau({ lignes }) {

  if (lignes.length === 0) {

    return <p>Chargement des statistiques...</p>;

  }
  const totalLignes = lignes.length;

  const totalArrets = lignes.reduce(
    (total, ligne) => total + ligne.arrets,
    0
  );

  const ligneMax = lignes.reduce(
    (max, ligne) =>
      ligne.arrets > max.arrets ? ligne : max,
    lignes[0]
  );

  return (
    <div className="stats-reseau">

      <div className="stat-box">
        <h3>{totalLignes}</h3>
        <p>Lignes disponibles</p>
      </div>

      <div className="stat-box">
        <h3>{totalArrets}</h3>
        <p>Arrêts au total</p>
      </div>

      <div className="stat-box">
        <h3>Ligne {ligneMax.numero}</h3>
        <p>Plus grand trajet</p>
      </div>

    </div>
  );
}

export default StatReseau;