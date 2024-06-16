import React from 'react'
import PostForm from './forms/PostForm';

export type UserPersonalPostType = {
    title: string;
    recipe: string,
    postImages:FileList,
    images: string[];
}

type CreatePostProps = {
    modalCloseHandler: ()=>void
}

const CreatePost = ({modalCloseHandler}: CreatePostProps) => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }
    
    return (
        <div className='w-full h-4/6 md:w-2/4 md:h-auto bg-white rounded-xl' onClick={handleClick}>

            <h3 className='text-xl font-bold p-5 border-b-2 border-gray-200'>Cook Something!</h3>
            <PostForm modalCloseHandler={modalCloseHandler}/>

        </div>
    )
}

export default CreatePost