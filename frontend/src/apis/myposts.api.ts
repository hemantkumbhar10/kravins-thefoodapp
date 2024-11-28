import { IUserPostsWithComments, UserPersonalBEPostType } from "../types/BackendTypes";

const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;




export const getMyPost = async (postId: string) => {
  const response = await fetch(`${URL}/api/mypost/${postId}`, {
    credentials: 'include',
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
}


export const getAllMyPost = async (): Promise<IUserPostsWithComments[]> => {
  const response = await fetch(`${URL}/api/mypost/all/all-posts`, {
    credentials: 'include',
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
}

export const createMyPost = async (myPostFormData: FormData) => {
  const response = await fetch(`${URL}/api/mypost`, {
    method: 'POST',
    credentials: 'include',
    body: myPostFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to create post!");
  }

  return response.json();
}



export const updateMyPost = async (myPostFormData: FormData) => {
  const response = await fetch(`${URL}/api/mypost`, {
    method: 'PUT',
    credentials: 'include',
    body: myPostFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to update post!");
  }

  return response.json();
}



export const deleteMyPost = async (postId: string) => {
  const response = await fetch(`${URL}/api/mypost/${postId}`, {
    method: "DELETE",
    credentials: 'include',
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
}
