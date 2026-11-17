// Thin wrapper around the AresAML Spring Boot API.
// In dev, calls go to /api/... and Vite proxies them to http://localhost:8080.
// For a deployed build, set VITE_API_URL (e.g. https://your-api.onrender.com).

const BASE = import.meta.env.VITE_API_URL || '';

async function handle(res) {
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body && body.error) msg = body.error;
    } catch (_) { /* ignore non-JSON error bodies */ }
    throw new Error(msg);
  }
  return res.json();
}

/** Analyse the bundled 30-transaction demo CSV on the server. */
export function fetchDemoAnalysis() {
  return fetch(`${BASE}/api/analysis/demo`).then(handle);
}

/** Analyse the built-in sample scenario. */
export function fetchSampleAnalysis() {
  return fetch(`${BASE}/api/analysis/sample`).then(handle);
}

/** Upload a CSV file and get the analysis back. */
export function uploadCsv(file) {
  const form = new FormData();
  form.append('file', file);
  return fetch(`${BASE}/api/analysis/upload`, { method: 'POST', body: form }).then(handle);
}
