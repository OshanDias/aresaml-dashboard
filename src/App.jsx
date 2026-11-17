import { useState, useEffect } from 'react';
import { fetchDemoAnalysis, uploadCsv } from './api';
import SummaryCards from './components/SummaryCards';
import AlertsList from './components/AlertsList';
import RiskTable from './components/RiskTable';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');

  // Load the demo dataset once on first render.
  useEffect(() => {
    runDemo();
  }, []);

  async function runDemo() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDemoAnalysis();
      setResult(data);
      setSource('Demo dataset (sample-transactions.csv)');
    } catch (e) {
      setError(e.message + ' — is the Spring Boot API running on :8080?');
    } finally {
      setLoading(false);
    }
  }

  async function onUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await uploadCsv(file);
      setResult(data);
      setSource(`Uploaded: ${file.name}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      e.target.value = ''; // allow re-uploading the same file
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>AresAML</h1>
          <p className="subtitle">Anti-Money-Laundering Transaction Risk Dashboard</p>
        </div>
        <div className="actions">
          <button onClick={runDemo} disabled={loading}>Run demo data</button>
          <label className="upload-btn">
            Upload CSV
            <input type="file" accept=".csv" onChange={onUpload} hidden />
          </label>
        </div>
      </header>

      {source && <p className="source-line">Source: {source}</p>}

      {loading && <div className="state">Analysing…</div>}
      {error && <div className="state error">{error}</div>}

      {result && !loading && (
        <>
          <SummaryCards result={result} />

          <section>
            <h2>Alerts</h2>
            <AlertsList alerts={result.alerts} />
          </section>

          <section>
            <h2>Risk Ranking</h2>
            <p className="hint">Click a row to see why each account was scored.</p>
            <RiskTable profiles={result.riskProfiles} />
          </section>
        </>
      )}

      <footer className="foot">
        AresAML engine — directed-graph cycle detection · smurfing detection · transparent risk scoring
      </footer>
    </div>
  );
}
