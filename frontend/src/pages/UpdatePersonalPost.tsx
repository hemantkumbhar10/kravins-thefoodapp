
import { useQuery } from "react-query";
import * as personalPostApiClient from '../apis/myposts.api';
import { useParams } from 'react-router-dom';
import PostForm from '../components/forms/PostForm';

import { useAppContext } from '../contexts/useAppContext';
import { useNavigate } from 'react-router-dom';

import { useMutation } from 'react-query';
import * as myPersonalPostApis from '../apis/myposts.api';

const UpdatePersonalPost = () => {

    const { id } = useParams();

    const { data: post } = useQuery('personalPost', () => personalPostApiClient.getMyPost(id!));

    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(myPersonalPostApis.updateMyPost, {
        onSuccess: async () => {
            showToast({ message: 'Post Updated!', type: 'SUCCESS' });
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
        <>
            <h3 className='w-full text-2xl font-bold p-5 border-b-2 border-gray-200'>Edit Post</h3>
            <PostForm myPost={post} postFormHandler={handlePostForm} isLoading={isLoading} />
        </>
    )
}



export default UpdatePersonalPost;
