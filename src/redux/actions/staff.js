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

export const setAssignedCourses = (courses) => {
  return {
    type: "SET_ASSIGNED_COURSES",
    payload: courses,
  };
};
