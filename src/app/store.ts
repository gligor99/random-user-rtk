import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "../features/users/usersApiSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(usersApi.middleware);
  },
});


// A utility used to enable refetchOnFocus and refetchOnReconnect behaviors. 
// It requires the dispatch method from your store. Calling setupListeners(store.dispatch) will configure listeners with the recommended defaults, 
// but you have the option of providing a callback for more granular control.
setupListeners(store.dispatch); 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
