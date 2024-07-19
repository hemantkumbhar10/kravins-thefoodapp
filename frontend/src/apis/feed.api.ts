
import { FeedPosts } from "../types/BackendTypes";

const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;


export type SearchPostsParams = {
  page: string;
}




export const getFeedPosts = async ({ pageParam }: { pageParam: any }): Promise<FeedPosts> => {

  const queryParams = new URLSearchParams();

  queryParams.append("page", pageParam)

  const response = await fetch(`${URL}/api?${queryParams}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Could not search posts!');
  }

  return response.json();
}
