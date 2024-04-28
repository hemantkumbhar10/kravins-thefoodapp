import React from 'react'
import PostForm from './forms/PostForm';

export type UserPersonalPostType = {
    title: string;
    recipe: string,
    postImages:FileList,
    images: string[];
}

type CreatePostProps = {
    modalOpenHandler: ()=>void
}

const CreatePost = ({modalOpenHandler}: CreatePostProps) => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }
    
    return (
        <div className='w-2/4 h-auto bg-white rounded-xl' onClick={handleClick}>

            <h3 className='text-xl font-bold p-5 border-b-2 border-gray-200'>Cook Something!</h3>
            <PostForm modalOpenHandler={modalOpenHandler}/>

        </div>
    )
}

export default CreatePost