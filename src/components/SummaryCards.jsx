// Top row of stat tiles summarising the analysis.

function countType(alerts, type) {
  return alerts.filter((a) => a.type === type).length;
}

export default function SummaryCards({ result }) {
  const alerts = result.alerts || [];
  const profiles = result.riskProfiles || [];

  const tiles = [
    { label: 'Accounts', value: profiles.length, tone: 'neutral' },
    { label: 'Total Alerts', value: alerts.length, tone: 'neutral' },
    { label: 'Laundering Rings', value: countType(alerts, 'CYCLE'), tone: 'high' },
    { label: 'Smurfing', value: countType(alerts, 'SMURFING'), tone: 'high' },
    { label: 'Large Transfers', value: countType(alerts, 'LARGE_TRANSACTION'), tone: 'med' },
    { label: 'High Risk', value: profiles.filter((p) => p.riskBand === 'HIGH').length, tone: 'high' },
  ];

  return (
    <div className="cards">
      {tiles.map((t) => (
        <div key={t.label} className={`card card-${t.tone}`}>
          <div className="card-value">{t.value}</div>
          <div className="card-label">{t.label}</div>
        </div>
      ))}
    </div>
  );
}
