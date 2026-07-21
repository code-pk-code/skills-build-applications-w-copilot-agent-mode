import { useEffect, useState } from 'react';
import { fetchResource, getApiUrl } from './api.js';

// Codespaces API endpoint example: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts
const API_COMPONENT = 'workouts';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource(API_COMPONENT)
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-1">Workouts</h1>
          <p className="text-muted mb-0">Explore workout templates organized by focus and difficulty.</p>
        </div>
        <small className="text-muted">API: {getApiUrl(API_COMPONENT)}</small>
      </div>

      {loading && <div className="alert alert-info">Loading workouts…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-secondary">No workouts available.</div>
      )}

      {!loading && !error && workouts.length > 0 && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6 col-xl-4" key={workout._id || workout.title}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title mb-1">{workout.title}</h5>
                  <p className="card-text mb-2">Focus: {workout.focus}</p>
                  <p className="mb-1">Duration: {workout.duration}</p>
                  <p className="mb-0">Difficulty: {workout.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
