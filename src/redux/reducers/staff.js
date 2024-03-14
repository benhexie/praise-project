const initialState = {
  professional: {
    experience: [],
    education: [],
    catalog: [],
  },
  courses: [],
};

// This reducer is only available to the staffs and view-only admins
export const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_PROFESSIONAL":
      if (!action.payload) return state;
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

    case "DELETE_PORTFOLIO_ITEM":
      const category = action.payload.category;
      const id = action.payload.id;
      const updatedCategory = state.professional[category].filter(
        (item) => item._id !== id,
      );
      return {
        ...state,
        professional: {
          ...state.professional,
          [category]: updatedCategory,
        },
      };

    default:
      return state;
  }
};
