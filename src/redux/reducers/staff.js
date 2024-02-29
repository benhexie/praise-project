const initialState = {
  professional: {
    experience: [],
    education: [],
    catalog: [],
  },
  courses: [],
};

export const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_PROFESSIONAL":
      return { ...state, professional: action.payload };

    case "SET_TOKEN":
      return {
        ...state,
        school: {
          ...state.school,
          token: action.payload,
        },
      };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        professional: {
          ...state.professional,
          experience: action.payload,
        },
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        professional: {
          ...state.professional,
          education: action.payload,
        },
      };

    case "UPDATE_CATALOG":
      return {
        ...state,
        professional: {
          ...state.professional,
          catalog: action.payload,
        },
      };

    case "SET_ASSIGNED_COURSES":
      return { ...state, courses: action.payload };

    default:
      return state;
  }
};
