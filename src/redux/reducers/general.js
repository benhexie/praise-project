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

    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };

    case "NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          return { ...notification, read: true };
        }),
      };

    default:
      return state;
  }
};
