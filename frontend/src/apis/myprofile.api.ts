import { UserInfoPropType } from "../components/UserInformation";
import { UserProfileResponseType, UserAvatarResponseType } from "../types/BackendTypes";

const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export type UpdateAvatarType = {
    avatarName: string | undefined
}

export const fetchMyProfile = async (): Promise<UserProfileResponseType> => {
    const response = await fetch(`${URL}/api/user/me`, {
        credentials: 'include',
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Could not fetch user profile!');
    }

    return response.json();
}

export const updateMyProfile = async (formData: UserInfoPropType): Promise<UserProfileResponseType> => {
    const response = await fetch(`${URL}/api/user/updateUserInfo`, {
        credentials: "include",
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const updateMyAvatar = async (avatar: UpdateAvatarType): Promise<UserAvatarResponseType> => {
    const response = await fetch(`${URL}/api/avatars/changeAvatar`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(avatar)
    });

    if (!response.ok) {
        throw new Error('Could not update avatar!');
    }

    return response.json();
}