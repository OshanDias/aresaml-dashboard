# AresAML Dashboard

A React (Vite) frontend for the AresAML API. It calls the Spring Boot backend and
renders the money-laundering analysis as a dashboard: summary tiles, a colour-coded
alert feed, and a risk-ranking table where each account's score expands to show the
plain-English reasons behind it.

## Requirements

- Node.js 18+ and npm
- The **AresAML API** (Spring Boot) running on `http://localhost:8080`

## Run (development)

1. Start the backend first (the `aresaml-api` project) so it's live on `:8080`.
2. Then, in this folder:

```bash
npm install     # first time only
npm run dev
```

3. Open the URL Vite prints (usually `http://localhost:5173`).

The Vite dev server proxies `/api/*` calls to `localhost:8080`, so no CORS setup is
needed in development.

## Build for production

```bash
npm run build     # outputs static files to dist/
```

For a deployed build, point the frontend at your live API by setting `VITE_API_URL`
(e.g. `VITE_API_URL=https://your-api.onrender.com npm run build`).

## Structure

```
src/
  api.js                 API calls to the backend
  App.jsx                page layout + data loading
  components/
    SummaryCards.jsx     stat tiles
    AlertsList.jsx       alert feed, badged by type
    RiskTable.jsx        risk ranking, click a row for reasons
  styles.css
```
