import { useEffect, useState } from 'react';
import { fetchResource, getApiUrl } from './api.js';

// Codespaces API endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
const API_COMPONENT = 'teams';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource(API_COMPONENT)
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-1">Teams</h1>
          <p className="text-muted mb-0">Browse team rosters, member counts, and focus areas.</p>
        </div>
        <small className="text-muted">API: {getApiUrl(API_COMPONENT)}</small>
      </div>

      {loading && <div className="alert alert-info">Loading teams…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-secondary">No teams found.</div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-12 col-md-6" key={team._id || team.name}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title mb-1">{team.name}</h5>
                  <p className="card-text mb-2">Focus: {team.focus}</p>
                  <p className="mb-0 text-muted">Members: {team.members}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
