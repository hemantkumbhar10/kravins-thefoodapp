import { configureStore } from "@reduxjs/toolkit";
import avatarSlice from './userProfile-slice';


const store = configureStore({
    reducer: { userprofile: avatarSlice.reducer }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;