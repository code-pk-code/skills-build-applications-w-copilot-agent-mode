import './App.css'
import { Link, NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navItems = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const remoteUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/`
    : '/api/'

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-navbar"
            aria-controls="octofit-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="octofit-navbar">
            <ul className="navbar-nav ms-auto gap-2">
              {navItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active fw-semibold' : 'text-secondary'}`
                    }
                    to={item.path}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        {!codespaceName && (
          <div className="alert alert-warning">
            <strong>VITE_CODESPACE_NAME is not set.</strong> The app will use a relative API fallback
            <code>/api/[component]/</code> instead of <code>https://&lt;codespace&gt;-8000.app.github.dev/api/</code>.
            For Codespaces, define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>.
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body p-5">
                      <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
                      <p className="lead text-muted">
                        A modern multi-tier fitness and team tracking experience that uses React Router for navigation
                        and dynamic Codespace API endpoints.
                      </p>
                      <p className="mb-0">
                        Your API endpoint pattern is:{' '}
                        <code>{codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/[component]/` : '/api/[component]/'}</code>
                      </p>
                    </div>
                  </div>

                  <div className="row g-3">
                    {navItems.map((item) => (
                      <div className="col-12 col-md-6" key={item.path}>
                        <div className="card h-100 shadow-sm">
                          <div className="card-body">
                            <h5 className="card-title">{item.label}</h5>
                            <p className="card-text text-muted mb-3">
                              Browse the {item.label.toLowerCase()} endpoint and review the dataset.
                            </p>
                            <Link className="btn btn-sm btn-primary" to={item.path}>
                              View {item.label}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
