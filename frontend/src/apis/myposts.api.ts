
// type DBUserPersonalPostType = {
//     _id: string;
//     userId:string;
//     title: string;
//     recipe: string,
//     images: string[];
//     lastUpdated: Date;
// }

const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const createMyNewPost = async(mypostFormData: FormData)=>{
    const response = await fetch(`${URL}/api/mypost`,{
        method:'POST',
        credentials:'include',
        body: mypostFormData,

    });

    if(!response.ok){
        throw new Error("Failed to create post!");
    }

    return response.json();
}