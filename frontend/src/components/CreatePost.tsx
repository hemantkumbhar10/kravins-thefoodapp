import PostForm from './forms/PostForm';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../hooks/mutations/posts/useCreatePostMutation';

export type UserPersonalPostType = {
    title: string;
    recipe: string,
    postImages: FileList,
    images: string[];
}

const CreatePost = () => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useCreatePostMutation(navigate);

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
