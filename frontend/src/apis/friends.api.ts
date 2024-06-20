import { ConnectedFriendsResponse } from "../types/BackendTypes";


const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;



export const addFriend = async (friendsUsername: string) => {
    const response = await fetch(`${URL}/api/friends/add-friend`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendsUsername }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}


export const deleteFriend = async (friendsUsername: string) => {
    const response = await fetch(`${URL}/api/friends/delete-friend`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendsUsername })
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}


export const getFriendsInfos = async ():Promise<ConnectedFriendsResponse> => {
    const response = await fetch(`${URL}/api/user/get-users`, {
        method: 'GET',
        credentials: 'include',
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}


export const getFriendRequestInfos = async ():Promise<ConnectedFriendsResponse> => {
    const response = await fetch(`${URL}/api/user/get-friendrequests`, {
        method: 'GET',
        credentials: 'include',
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}