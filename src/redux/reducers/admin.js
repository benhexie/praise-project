const initialState = {
  courses: [],
  staffs: [],
};

export const adminReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_COURSES":
      return { ...state, courses: action.payload };

    case "UPDATE_COURSE":
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course._id === action.payload._id) {
            return action.payload;
          }
          return course;
        }),
      };

    case "ADD_COURSE":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload,
        ),
      };

    case "SET_STAFFS":
      return { ...state, staffs: orderStaffByScore(action.payload) };

    case "UPDATE_STAFF":
      return {
        ...state,
        staffs: state.staffs.map((staff) => {
          if (staff._id === action.payload._id) {
            return action.payload;
          }
          return staff;
        }),
      };

    default:
      return state;
  }
};

const orderStaffByScore = (staffs) => {
  const education = 3;
  const experience = 2;
  const catalog = 1;

  return staffs.sort((a, b) => {
    const aScore =
      a.educationCount * education +
      a.experienceCount * experience +
      a.catalogCount * catalog;
    const bScore =
      b.educationCount * education +
      b.experienceCount * experience +
      b.catalogCount * catalog;

    return bScore - aScore;
  });
};
