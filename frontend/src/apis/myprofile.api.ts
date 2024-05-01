import { UserProfileResponseType } from "../types/BackendTypes";

const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const fetchMyProfile = async ():Promise<UserProfileResponseType> => {
    const response = await fetch(`${URL}/api/user/me`, {
        credentials:'include',
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Could not fetch user profile!');
    }

    return response.json();
}