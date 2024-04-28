import React from 'react'
import PostForm from './forms/PostForm';
import { useMutation } from 'react-query';
import * as myPersonalPostApis from '../apis/myposts.api';

export type UserPersonalPostType = {
    title: string;
    recipe: string,
    images: string[];
}

const CreatePost = () => {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    const { mutate, isLoading } = useMutation(myPersonalPostApis.createMyNewPost, {
        onSuccess: async () => { },
        onError: async () => { },
    })

    const handlePostForm = (mypostFormData: FormData) => {
        mutate(mypostFormData);
    }

    return (
        <div className='w-2/4 h-auto bg-white rounded-xl' onClick={handleClick}>

            <h3 className='text-xl font-bold p-5 border-b-2 border-gray-200'>Cook Something!</h3>
            <PostForm postForm={handlePostForm} isLoading={isLoading} />

        </div>
    )
}

export default CreatePost