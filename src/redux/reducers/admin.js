const initialState = {
  courses: [],
  lecturers: [],
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
          (course) => course._id !== action.payload
        ),
      };

    case "SET_LECTURERS":
      return { ...state, lecturers: action.payload };

    default:
      return state;
  }
};
