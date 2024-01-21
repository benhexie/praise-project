import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  school: {},
  professional: {},
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

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducerFtn });

export default store;
