import React, { useContext } from "react";
import { DocsViewPdf } from "./view/DocsViewPdf";

export const PdfViewModal = ({ pdfData, onClose }) => {
  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal vista</h5>
            <button type="button" className ="btn btn-danger close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <DocsViewPdf pdfData={pdfData} />
          </div>
        </div>
      </div>
    </div>
  );
};
