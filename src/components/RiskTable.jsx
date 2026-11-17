import { Fragment, useState } from 'react';

// Risk ranking table. Each row is an account, coloured by its risk band.
// Click a row to expand the plain-English reasons behind its score.

export default function RiskTable({ profiles }) {
  const [openRow, setOpenRow] = useState(null);

  const flagged = (profiles || []).filter((p) => p.score > 0);

  if (flagged.length === 0) {
    return <p className="empty">No account scored above zero.</p>;
  }

  return (
    <table className="risk-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Account</th>
          <th>Score</th>
          <th>Band</th>
          <th>Why</th>
        </tr>
      </thead>
      <tbody>
        {flagged.map((p, i) => {
          const isOpen = openRow === i;
          return (
            <Fragment key={i}>
              <tr
                className={`band-${p.riskBand} ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenRow(isOpen ? null : i)}
              >
                <td>{i + 1}</td>
                <td>
                  <strong>{p.account.ownerName}</strong>
                  <span className="acc-num">{p.account.accountNumber}</span>
                </td>
                <td>
                  <div className="score-bar-wrap">
                    <div className={`score-bar band-fill-${p.riskBand}`} style={{ width: `${p.score}%` }} />
                    <span className="score-num">{p.score}</span>
                  </div>
                </td>
                <td><span className={`band-pill band-${p.riskBand}`}>{p.riskBand}</span></td>
                <td className="why-cell">{isOpen ? '▲ hide' : `▼ ${p.reasons.length} reason${p.reasons.length > 1 ? 's' : ''}`}</td>
              </tr>
              {isOpen && (
                <tr className="reasons-row">
                  <td></td>
                  <td colSpan={4}>
                    <ul className="reasons">
                      {p.reasons.map((r, j) => <li key={j}>{r}</li>)}
                    </ul>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
