/* eslint-disable no-restricted-syntax */
const tripFormReducer = (state, action) => {
  switch (action.name) {
    case 'setCurrent': {
      return { ...action.value };
    }
    case 'addItenerary': {
      const itns = state.tripIteneraries || [];
      itns.push(action.value);

      const { formData } = state;
      formData.set('tripIteneraries', JSON.stringify(itns));

      return { ...state, tripIteneraries: itns, formData };
    }
    case 'addService': {
      const srvcs = state.tripServices || [];
      srvcs.push(action.value);

      const { formData } = state;
      formData.set('tripServices', JSON.stringify(srvcs));

      return { ...state, tripServices: srvcs, formData };
    }
    case 'addExclusion': {
      const srvcs = state.tripExclusions || [];
      srvcs.push(action.value);

      const { formData } = state;
      formData.set('tripExclusions', JSON.stringify(srvcs));

      return { ...state, tripExclusions: srvcs, formData };
    }
    case 'addPackageCost': {
      const pckgs = state.tripCostPackages || [];
      pckgs.push(action.value);

      const { formData } = state;
      formData.set('tripCostPackages', JSON.stringify(pckgs));

      return { ...state, tripCostPackages: pckgs, formData };
    }
    case 'addCalendar': {
      const cldr = state.tripCalendar || [];
      cldr.push(action.value);

      const { formData } = state;
      formData.set('tripCalendar', JSON.stringify(cldr));

      return { ...state, tripCalendar: cldr, formData };
    }
    case 'addFeatureImage': {
      const { formData } = state;
      formData.set('featureImage', action.value);
      return { ...state, formData };
    }
    case 'addImagery': {
      const { formData } = state;
      formData.append('imagery', action.value);
      return { ...state, formData };
    }
    default: {
      const { formData } = state;
      formData.set(action.name, action.value);
      if (action.name === 'tripCategories') {
        formData.set(action.name, JSON.stringify(action.value));
      }
      return { ...state, [action.name]: action.value, formData };
    }
  }
};

export default tripFormReducer;
