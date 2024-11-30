export const CardInfo = ({
  iconComponent,
  title,
  value,
  footerText,
  linkText,
  linkHref,
}) => {
  return (
    <div className="col-md-6 col-xl-3 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <p className="card-text">{iconComponent}</p>
            </div>
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
          <a href={linkHref}>{linkText}</a>
        </div>
      </div>
    </div>
  );
};
