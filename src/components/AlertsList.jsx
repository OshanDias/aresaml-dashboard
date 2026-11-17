// List of every alert the engine raised, badged by type.

const TYPE_LABEL = {
  CYCLE: 'Laundering Ring',
  SMURFING: 'Smurfing',
  LARGE_TRANSACTION: 'Large Transfer',
};

export default function AlertsList({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <p className="empty">No suspicious activity detected.</p>;
  }

  return (
    <div className="alerts">
      {alerts.map((alert, i) => (
        <div key={i} className={`alert alert-${alert.type}`}>
          <span className={`badge badge-${alert.type}`}>{TYPE_LABEL[alert.type] || alert.type}</span>
          <span className="alert-desc">{alert.description}</span>
          <span className="alert-points">+{alert.riskPoints}</span>
        </div>
      ))}
    </div>
  );
}
