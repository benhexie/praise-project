export const setProfessional = (professional) => {
  return {
    type: "SET_PROFESSIONAL",
    payload: professional,
  };
};

export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};
