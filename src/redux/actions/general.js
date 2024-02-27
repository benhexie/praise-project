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
