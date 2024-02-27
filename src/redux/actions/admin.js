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

export const setLecturers = (lecturers) => {
  return {
    type: "SET_LECTURERS",
    payload: lecturers,
  };
};

export const setCourses = (courses) => {
  return {
    type: "SET_COURSES",
    payload: courses,
  };
};

export const addCourse = (course) => {
  return {
    type: "ADD_COURSE",
    payload: course,
  };
};

export const updateCourse = (course) => {
  return {
    type: "UPDATE_COURSE",
    payload: course,
  };
};

export const deleteCourse = (course) => {
  return {
    type: "DELETE_COURSE",
    payload: course,
  };
};