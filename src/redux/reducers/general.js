const initialState = {
  user: null,
  school: {},
  notifications: [],
};

export const generalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_SCHOOL":
      return { ...state, school: action.payload };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
