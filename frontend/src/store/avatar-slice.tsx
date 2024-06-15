import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AvatarState {
    user_avatar: string;
}

const avatarSlice =  createSlice({
    name:'avatar',
    initialState:{
        user_avatar : '',
    } as AvatarState,
    reducers:{
        updateUserAvatar(state, action:PayloadAction<string>){
            const avatar = action.payload;
            state.user_avatar = avatar; //Can do this cause RTK uses Immer library to look over data change
        }
    }
});

export const avatarActions = avatarSlice.actions;


export default avatarSlice;