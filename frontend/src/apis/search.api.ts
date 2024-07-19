import { FriendsSearchResponse } from "../types/BackendTypes";

const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;


export type SearchFriendsParams = {
    name: string;
    page: number;
}

export const searchFriends = async (searchData: SearchFriendsParams): Promise<FriendsSearchResponse> => {

    const queryParams = new URLSearchParams();

    queryParams.append("name", searchData.name);
    queryParams.append("page", searchData.page.toString())

    const response = await fetch(`${URL}/api/search/searchFriends?${queryParams}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Could not search people!');
    }

    return response.json();
}