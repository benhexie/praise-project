import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  school: {},
  professional: {},
  notifications: [
    {
      message: "Hello dear",
      createdAt: "23/34/3536",
    },
    {
      message: "Hello dear",
      createdAt: "23/34/3536",
    },
    {
      message: "Hello dear",
      createdAt: "23/34/3536",
    },
    {
      message: "Hello dear",
      createdAt: "23/34/3536",
    },
    {
      message: "Hello dear",
      createdAt: "23/34/3536",
    },
  ],
  teachers: [
    {
      _id: "qwertyuiop",
      firstname: "Oluwaseun",
      lastname: "Ebiesuwa",
      department: "Computer Science"
    },
  ],
};

const reducerFtn = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_SCHOOL":
      return { ...state, school: action.payload };

    case "SET_PROFESSIONAL":
      return { ...state, professional: action.payload };

    case "SET_TOKEN":
      return {
        ...state,
        school: {
          ...state.school,
          token: action.payload,
        },
      };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        professional: {
          ...state.professional,
          experience: action.payload,
        },
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        professional: {
          ...state.professional,
          education: action.payload,
        },
      };

    case "UPDATE_CATALOG":
      return {
        ...state,
        professional: {
          ...state.professional,
          catalog: action.payload,
        },
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducerFtn });

export default store;
