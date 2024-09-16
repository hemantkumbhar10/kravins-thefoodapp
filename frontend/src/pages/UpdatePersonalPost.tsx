import { useQuery } from "react-query";
import * as personalPostApiClient from '../apis/myposts.api';
import { useParams } from 'react-router-dom';
import PostForm from '../components/forms/PostForm';
import {useUpdatePostMutation} from '../hooks/mutations/posts/useUpdatePostMutation';
import { useNavigate } from 'react-router-dom';

const UpdatePersonalPost = () => {
    const { id } = useParams();
    console.log(id);
    const { data: post } = useQuery('personalPost', () => personalPostApiClient.getMyPost(id!));
    console.log(post)
    const navigate = useNavigate();
    const { mutate, isLoading } = useUpdatePostMutation(navigate);

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
