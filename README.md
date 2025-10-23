# netflix-clone

A small Netflix-like demo application with a Node/Express backend and a React frontend (Vite).

This repo is split into two main folders:

- `backend/` — Express server, routes, controllers, models and services (TMDB integration).
- `frontend/` — React (Vite) single-page app, components, pages and client-side routing.

This README summarizes the project's structure, how to run it locally, useful scripts, and troubleshooting tips.

## Tech stack

- Backend: Node.js, Express, cookie-parser
- Frontend: React + Vite, Tailwind CSS
- External API: The Movie Database (TMDB) via `backend/services/tmdb.service.js`

## Repo structure (important files)

- `backend/server.js` — Express app entry. Mounts routes under `/api/v1/*`.
- `backend/routes/` — Route definitions for `auth`, `movie`, `tv`, `search`.
- `backend/controllers/` — Controller implementations for each area (auth, movie, tv, search).
- `backend/config/` — DB and env var helpers (e.g. `envVars.js`, `db.js`).
- `backend/models/` — Mongoose (or similar) models (e.g. `user.model.js`).
- `backend/services/tmdb.service.js` — TMDB fetch helper used by movie/tv controllers.

- `frontend/src/` — React source code
	- `pages/` — top-level route pages (Home, WatchPage, SearchPage, Login/Signup)
	- `components/` — reusable components (e.g. `Navbar`, `ContentSlider`, `VideoPlayer`)
	- `store/` — tiny client stores (auth, content)

## Environment

Backend expects environment variables configured in `backend/config/envVars.js` (or through your environment). Typical variables:

- `PORT` — backend port (e.g. `5000`)
- `NODE_ENV` — `development` or `production`
- `MONGO_URI` (if used) — DB connection string
- `TMDB_API_KEY` — API key for The Movie Database

Do not commit secrets. Use a local `.env` or set environment variables in your shell.

## Running locally

Open two terminals (one for backend, one for frontend). These commands assume you're on Windows PowerShell and in the repository root.

Start the backend:

```powershell
cd backend
npm install
node server.js
```

Start the frontend (from repository root or `frontend` directory):

```powershell
cd frontend
npm install
npm run dev
```

Notes:
- The backend mounts API routes under `/api/v1/` (for example `/api/v1/auth/signup`, `/api/v1/tv/:id/trailers`).
- If you run frontend on a different port, ensure CORS or proxy settings allow requests to the backend.

## Important API endpoints

- `POST /api/v1/auth/signup` — create user
- `POST /api/v1/auth/login` — login (returns cookie / token)
- `POST /api/v1/auth/logout` — logout
- `GET /api/v1/tv/:id/trailers` — get trailers for a TV show (used by Watch page)
- `GET /api/v1/tv/:id/details` — TV details
- `GET /api/v1/movie/...` — movie endpoints (similar shape)

The routes for `movie`, `tv` and `search` are protected by `middleware/protectRoute.js` in many cases — ensure your client sends auth credentials (cookie or token) when needed.

## Frontend notes

- The Watch page is `frontend/src/pages/WatchPage.jsx`. It requests trailers from `/api/v1/{contentType}/{id}/trailers` and renders a player.
- A reusable video wrapper component was added at `frontend/src/components/VideoPlayer.jsx` which wraps `react-player` and provides a YouTube origin config and an iframe fallback helper.
- If videos appear blank in the browser, common causes are ad-blockers, CSP / X-Frame-Options blocking, or `react-player` configuration. See Troubleshooting below.

## Troubleshooting

- Blank player / video not rendering:
	- Try in Incognito with extensions disabled (ad-blockers often block YouTube iframes).
	- Check DevTools Console for errors (CSP, X-Frame-Options, network 403/404).
	- Verify `react-player` is installed in `frontend` (`npm ls react-player`). Consider upgrading if you suspect a bug: `npm install react-player@latest`.
	- Confirm the trailer object contains the expected shape (TMDB returns `{ site: "YouTube", key: "<youtube-key>" }`) and the component builds a full URL like `https://www.youtube.com/watch?v=<key>` or an embed URL.

- 404s / API not found:
	- Ensure backend is running and that routes are mounted correctly (`server.js` mounts `/api/v1/auth`, `/api/v1/movie`, `/api/v1/tv`, `/api/v1/search`).
	- Confirm there are no typos in route mount paths (e.g. `/api/vi/tv` vs `/api/v1/tv`).

## Contributing / Extending

- Add tests for controllers and frontend components.
- Consider centralizing API base URL in the frontend (environment variable) so the client can be configured for different dev ports without changing code.

## License

This project includes a top-level `LICENSE` file. Review it for license details.

If you want, I can expand this README with more detailed API docs (example requests/responses), or add a development quickstart script that runs both frontend and backend concurrently.

