export const DocumentSigningOverview = ({  
  signedCount,
  pendingCount,
  inProcessCount,
  completedOnTimePercentage,
  averageSigningTime,
}) => {
  return (
    <div className="mb-4">
      <div className="card overflow-hidden">
        <div className="card-header bg-light">
          <h5 className="mb-1">Document Signing Overview</h5>
          <p className="mb-0 text-muted">Key metrics and insights for the document signing process.</p>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h6 className="fw-bold">Document Status</h6>
            <div className="row">
              <div className="col-md-6 mb-2">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Signed</span>
                  <span className="fw-bold">{signedCount}</span>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Pending</span>
                  <span className="fw-bold">{pendingCount}</span>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">In Process</span>
                  <span className="fw-bold">{inProcessCount}</span>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Completed on Time</span>
                  <span className="fw-bold">{completedOnTimePercentage}</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <h6 className="fw-bold">Average Signing Time</h6>
            <div className="d-flex justify-content-between">
              <span className="text-muted">{averageSigningTime}</span>
              <span className="fw-bold">
                {/* Puedes agregar un icono aquí si es necesario */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
