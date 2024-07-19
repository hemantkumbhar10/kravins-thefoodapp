const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;




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
