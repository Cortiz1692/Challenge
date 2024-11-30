export const CardInfoDivDoc = ({
    title,
    value,
    footerText,
    iconBgClass
  }) => {
    return (
      <div className="col-md-6 col-xl-3 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="text-end">
                <p className="text-muted mb-0">{title}</p>
                <h4 className="mb-0">{value}</h4>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <p className="text-success mb-0">
              <strong>{footerText}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  };
  