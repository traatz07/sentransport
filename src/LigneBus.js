import './LigneBus.css';

function LigneBus({ numero, depart, arrivee, arrets, estSelectionnee, onClick, couleur }) {
  return (
    <div
      className={`ligne-bus${estSelectionnee ? ' ligne-bus-active' : ''}`}
      onClick={onClick}
    >
        <span
       className="ligne-badge"
        style={{ backgroundColor: couleur }}
      >
         {numero}
      </span>

      <div className="ligne-info">
        <span className="ligne-trajet">
          {depart} &rarr; {arrivee}
        </span>
        <span className="ligne-arrets">{arrets} arrets</span>
      </div>
    </div>
  );
}

export default LigneBus;
