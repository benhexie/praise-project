const initialState = {
  theme: null,
  user: null,
  school: {},
  notifications: [],
};

export const generalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_THEME":
      if (action.payload) localStorage.setItem("theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
      return { ...state, theme: action.payload };

    case "TOGGLE_THEME":
      if (state.theme === "light") {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        return { ...state, theme: "dark" };
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        return { ...state, theme: "light" };
      }

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

    case "SET_TOKEN":
      return {
        ...state,
        school: {
          ...state.school,
          token: action.payload,
        },
      };

    default:
      return state;
  }
};
