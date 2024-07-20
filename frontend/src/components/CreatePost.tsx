import React from 'react'
import PostForm from './forms/PostForm';

import { useAppContext } from '../contexts/useAppContext';
import { useNavigate } from 'react-router-dom';

import { useMutation } from 'react-query';
import * as myPersonalPostApis from '../apis/myposts.api';

export type UserPersonalPostType = {
    title: string;
    recipe: string,
    postImages: FileList,
    images: string[];
}



const CreatePost = () => {

    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(myPersonalPostApis.createMyPost, {
        onSuccess: async () => {
            showToast({ message: 'Nom, Nom! Yummy post!', type: 'SUCCESS' });
            navigate('/');
        },
        onError: async () => {
            showToast({ message: 'Something went wrong!', type: 'ERROR' });
        },
    })

    const handlePostForm = (mypostFormData: FormData) => {
        mutate(mypostFormData);
        // console.log(mypostFormData);
    }


    return (
        <div className='w-full sm:w-2/3 m-auto h-auto flex flex-col justify-around items-start' >

            <h3 className='w-full text-2xl font-bold p-5 border-b-2 border-gray-200'>Cook Something!</h3>
            <PostForm postFormHandler={handlePostForm} isLoading={isLoading} />

        </div>
    )
}

export default CreatePost
