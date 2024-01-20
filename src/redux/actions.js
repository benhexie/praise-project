export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setSchool = (school) => {
  return {
    type: "SET_SCHOOL",
    payload: school,
  };
};

export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};