import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyProfile } from '../apis/myprofile.api';
import { IUser, UserProfileResponseType } from '../types/BackendTypes';
import {AppDispatch} from './index';

export interface UserProfileType extends IUser{
    avatarOptions: [{
        [key: string]: string;
    }];
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {} as UserProfileResponseType,
    reducers: {
        updateUser(state, action: PayloadAction<UserProfileResponseType>) {
            const userProfileData = action.payload;
            state.user = userProfileData.user;
            state.avatarOptions = userProfileData.avatarOptions;
        }
    }
});

export const getUserProfileData = () => {
    return async (dispatch: AppDispatch) => {
        const userProfileData = await fetchMyProfile();
        dispatch(userProfileSlice.actions.updateUser(userProfileData));
    }
}

export const avatarActions = userProfileSlice.actions;
export default userProfileSlice;
