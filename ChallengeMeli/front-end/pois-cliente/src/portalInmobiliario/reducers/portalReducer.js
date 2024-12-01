const portalReducer = (state, action) => {
  switch (action.type) {
    case 'loadingProperties':
      return {
        ...state,
        properties: action.payload,
      };
    case 'loadingPois':
      return {
        ...state,
        pois: action.payload,
      };
    case 'setSelectedProperty':
      return {
        ...state,
        selectedProperty: action.payload,
      };
    case 'ADD_POI':
      return {
        ...state,
        pois: [...state.pois, action.payload],
      };
    default:
      return state;
  }
};

export default portalReducer;
