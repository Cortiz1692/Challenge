// reducer.js
export const reportsReducer = (state, action) => {
  switch (action.type) {
    case 'loadingDashboardSigned':
      return {
        ...state,
        signedDocuments: action.payload,
        loading: false,
      };
    case 'loadingDashboardPending':
      return {
        ...state,
        pendingDocuments: action.payload,
        loading: false,
      };
    case 'loadingDocumentProcessedByMonth':
      return {
        ...state,
        processedByMonth: action.payload,
        loading: false,
      }
    default:
      return state;
  }
};
