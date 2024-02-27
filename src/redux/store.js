import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, generalReducer, userReducer } from "./reducers";

const store = configureStore({
  reducer: {
    general: generalReducer,
    admin: adminReducer,
    user: userReducer,
  },
});

export default store;
