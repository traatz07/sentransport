import './Statistique.css';

function Statistique() {
  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3 className="stat-nombre">10 lignes</h3>
        <p className="stat-texte">Actives sur le réseau</p>
      </div>

      <div className="stat-card">
        <h3 className="stat-nombre">128 arrêts</h3>
        <p className="stat-texte">Dans Dakar</p>
      </div>

      <div className="stat-card">
        <h3 className="stat-nombre">500 bus</h3>
        <p className="stat-texte">En circulation</p>
      </div>

    </div>
  );
}

export default Statistique;