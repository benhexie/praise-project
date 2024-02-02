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

export const updateExperience = (experience) => {
  return {
    type: "UPDATE_EXPERIENCE",
    payload: experience,
  };
};

export const updateEducation = (education) => {
  return {
    type: "UPDATE_EDUCATION",
    payload: education,
  };
};

export const updateCatalog = (catalog) => {
  return {
    type: "UPDATE_CATALOG",
    payload: catalog,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
