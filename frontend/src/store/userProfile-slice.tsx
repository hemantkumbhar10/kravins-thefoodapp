import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMyProfile } from '../apis/myprofile.api';
import { UserProfileResponseType } from '../types/BackendTypes';
import {AppDispatch} from './index';

export interface UserProfileType {
    _id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    user_avatar: string;
    avatarOptions: [{
        [key: string]: string;
    }];
    friends: {
        friendsRequestUsernames: string[];
        friendsUsernames: string[];
    };
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        _id: '',
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        user_avatar: '',
        avatarOptions: [{}],
        friends: {
            friendsRequestUsernames: [],
            friendsUsernames: []
        }
    } as UserProfileType,
    reducers: {
        updateUser(state, action: PayloadAction<UserProfileResponseType>) {
            const userProfileData = action.payload;
            state._id = userProfileData.user._id; //Can do this cause RTK uses Immer library to look over data change
            state.email = userProfileData.user.email;
            state.firstname = userProfileData.user.firstname;
            state.lastname = userProfileData.user.lastname;
            state.username = userProfileData.user.username;
            state.user_avatar = userProfileData.avatar;
            state.avatarOptions = userProfileData.avatarOptions;
            state.friends.friendsRequestUsernames = userProfileData.user.friends.friendsRequestUsernames;
            state.friends.friendsUsernames = userProfileData.user.friends.friendsUsernames;
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