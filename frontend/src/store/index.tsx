import { configureStore } from "@reduxjs/toolkit";
import avatarSlice from './avatar-slice';


const store  = configureStore({
    reducer: { avatar: avatarSlice.reducer }
});


export default store;