import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { adminReducer, generalReducer, userReducer } from "./reducers";

const store = configureStore({
  reducer: combineReducers({
    admin: adminReducer,
    general: generalReducer,
    user: userReducer,
  }),
});

export default store;
