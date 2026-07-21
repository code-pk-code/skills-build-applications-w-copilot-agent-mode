import { useEffect, useState } from 'react';
import { fetchResource, getApiUrl } from './api.js';

const API_COMPONENT = 'activities';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource(API_COMPONENT)
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-1">Activities</h1>
          <p className="text-muted mb-0">View recent activity sessions and progress entries.</p>
        </div>
        <small className="text-muted">API: {getApiUrl(API_COMPONENT)}</small>
      </div>

      {loading && <div className="alert alert-info">Loading activities…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-secondary">No activities available yet.</div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.type}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
