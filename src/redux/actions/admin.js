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

export const setStaffs = (staffs) => {
  return {
    type: "SET_STAFFS",
    payload: staffs,
  };
};

export const updateStaff = (staff) => {
  return {
    type: "UPDATE_STAFF",
    payload: staff,
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

export const updateAssignedCourse = (course) => {
  return {
    type: "UPDATE_ASSIGNED_COURSE",
    payload: course,
  };
};