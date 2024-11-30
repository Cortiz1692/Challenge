  export const dotaReducer = (state = [], action) => {
    switch (action.type) {
      case 'loadingDotaRejected':
        return action.payload;
      default:
        return state;
    }
  };