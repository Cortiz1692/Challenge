import React from "react";

export const DocsViewPdf = ({ pdfData }) => {
  const base64Data = btoa(pdfData);
  const pdfSrc = `data:application/pdf;base64,${base64Data}`;

  return (
    <div>
      <h1>Documento PDF</h1>
      <embed src={pdfSrc} type="application/pdf" width="100%" height="600px" />
    </div>
  );
};
