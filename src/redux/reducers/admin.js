const initialState = {
  courses: [],
  staffs: [],
  messages: [],
  hasFetchedMessages: false,
};

// This reducer is only available to the admin and partly to the view-only admins
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

    case "UPDATE_ASSIGNED_COURSE":
      return {
        ...state,
        courses: state.courses.map((course) => {
          if (course._id === action.payload._id) {
            return action.payload;
          }
          return course;
        }),
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };

    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message._id === action.payload._id) {
            return action.payload;
          }
          return message;
        }),
      };

    case "HAS_FETCHED_MESSAGES":
      return {
        ...state,
        hasFetchedMessages: true,
      };

    default:
      return state;
  }
};

const orderStaffByScore = (staffs) => {
  const education = 3;
  const experience = 2;
  const catalog = 1;
  const phd = 10,
    msc = 8,
    bsc = 5;

  return staffs.sort((a, b) => {
    let aScore = 0,
      bScore = 0;

    a?.education?.forEach((edu) => {
      if (/phd/i.test(edu.degree?.replace(".", ""))) aScore += phd;
      if (/msc/i.test(edu.degree?.replace(".", ""))) aScore += msc;
      if (/bsc/i.test(edu.degree?.replace(".", ""))) aScore += bsc;
    });

    b?.education?.forEach((edu) => {
      if (/phd/i.test(edu.degree?.replace(".", ""))) bScore += phd;
      if (/msc/i.test(edu.degree?.replace(".", ""))) bScore += msc;
      if (/bsc/i.test(edu.degree?.replace(".", ""))) bScore += bsc;
    });

    aScore +=
      (a?.education?.length || 0) * education +
      (a?.experience?.length || 0) * experience +
      (a?.catalog?.length || 0) * catalog;
    bScore +=
      (b?.education?.length || 0) * education +
      (b?.experience?.length || 0) * experience +
      (b?.catalog?.length || 0) * catalog;

    return bScore - aScore;
  });
};
