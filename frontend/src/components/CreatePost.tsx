import React from 'react'
import PostForm from './forms/PostForm';

export type UserPersonalPostType = {
    title: string;
    recipe: string,
    postImages:FileList,
    images: string[];
}



const CreatePost = () => {


    
    return (
        <div className='w-full sm:w-2/3 m-auto h-auto flex flex-col justify-around items-start' >

            <h3 className='w-full text-2xl font-bold p-5 border-b-2 border-gray-200'>Cook Something!</h3>
            <PostForm/>

        </div>
    )
}

export default CreatePost