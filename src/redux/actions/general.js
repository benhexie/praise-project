export const setTheme = (theme) => {
  return {
    type: "SET_THEME",
    payload: theme,
  };
};

export const toggleTheme = () => {
  return {
    type: "TOGGLE_THEME",
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};

export const setSchool = (school) => {
  return {
    type: "SET_SCHOOL",
    payload: school,
  };
};

export const setNotifications = (notifications) => {
  return {
    type: "SET_NOTIFICATIONS",
    payload: notifications,
  };
};

export const notificationsRead = () => {
  return {
    type: "NOTIFICATIONS_READ",
  };
};
