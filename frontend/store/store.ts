import { apiUsers } from "@/features/users/apiUsers";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSliceReducer from "@/features/users/userSlice";

export const store = configureStore({
  reducer: {
    [apiUsers.reducerPath]: apiUsers.reducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiUsers.middleware]),
});

setupListeners(store.dispatch);
