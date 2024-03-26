const initialState = {
  maxScore: 0,
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
      const staffs = orderStaffByScore(action.payload);
      const maxScore = staffs[0]?.score || 0;
      return { ...state, staffs, maxScore };

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
    bsc = 6;

  // add score to staff data
  staffs = staffs.map((staff) => {
    let score = 0;

    staff?.education?.forEach((edu) => {
      if (/phd/i.test(edu.degree?.replace(".", ""))) score += phd;
      if (/msc/i.test(edu.degree?.replace(".", ""))) score += msc;
      if (/bsc/i.test(edu.degree?.replace(".", ""))) score += bsc;
    });

    score +=
      (staff?.education?.length || 0) * education +
      (staff?.experience?.length || 0) * experience +
      (staff?.catalog?.length || 0) * catalog;

    const maxCredits = staff?.maxCredits || 15;

    return { ...staff, score, maxCredits };
  });

  return staffs.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });
};
