import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const reducerFtn = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_SCHOOL":
      return { ...state, school: action.payload };

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducerFtn });

export default store;
