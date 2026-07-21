import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness and team tracking experience for your next app iteration.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <span className="badge bg-primary-subtle text-primary-emphasis">React 19</span>
                <span className="badge bg-success-subtle text-success-emphasis">Vite</span>
                <span className="badge bg-info-subtle text-info-emphasis">Express + TypeScript</span>
                <span className="badge bg-warning-subtle text-warning-emphasis">MongoDB + Mongoose</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
