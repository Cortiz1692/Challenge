export const ObservationModal = ({
  show,
  handleClose,
  observation,
  onApprove,
  onReject,
  showApprovalButtons,
}) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Observación</h5>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>{observation}</p>
          </div>

          <div className="modal-footer">
            {showApprovalButtons && (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onApprove}
                >
                  Aprobar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onReject}
                >
                  No aprobar
                </button>
              </>
            )}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
