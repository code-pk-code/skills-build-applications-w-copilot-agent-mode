import { useEffect, useState } from 'react';
import { fetchResource, getApiUrl } from './api.js';

// Codespaces API endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
const API_COMPONENT = 'leaderboard';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource(API_COMPONENT)
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-1">Leaderboard</h1>
          <p className="text-muted mb-0">See top performers and streaks across your team.</p>
        </div>
        <small className="text-muted">API: {getApiUrl(API_COMPONENT)}</small>
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-secondary">Leaderboard is currently empty.</div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id || `${entry.name}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.points}</td>
                  <td>{entry.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
