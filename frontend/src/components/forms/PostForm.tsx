import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import PostDetailsInputs from '../ui/PostDetailsInputs'
import { IUserCommentsResponse, UserPersonalBEPostType } from '../../types/BackendTypes';
import { UserPersonalPostType } from '../CreatePost';

type props = {
    myPost?:  {comments:IUserCommentsResponse, post:UserPersonalBEPostType};
    postFormHandler: (postFormData: FormData) => void;
    isLoading: boolean
}

const PostForm = ({ myPost, postFormHandler, isLoading }: props) => {

    const formMethods = useForm<UserPersonalPostType>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(myPost?.post);
    }, [myPost, reset]);

    const postSubmitHandler = handleSubmit((formDataJson: UserPersonalPostType) => {
        const formData = new FormData();

        if (myPost) {
            formData.append("postId", myPost?.post._id);
        }
        formData.append("title", formDataJson.title);
        formData.append("recipe", formDataJson.recipe);

        if (formDataJson.images) {
            formDataJson.images.forEach((url, index) => {
                formData.append(`images[${index}]`, url);
            })
        }

        Array.from(formDataJson.postImages).forEach((file) => {
            formData.append('postImages', file);
        })

        // for (const pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1] + "  TYPE OF--->" + typeof (pair[1]));
        //     console.log( pair[1].toString())
        // }
        // console.log(formDataJson)
        // console.log(formDataJson.name)

        postFormHandler(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className='w-full p-3 mx-3' onSubmit={postSubmitHandler}>
                <PostDetailsInputs />
                <span className="flex justify-end mt-3">
                    <button disabled={isLoading} type='submit' className='text-sm bg-tomato text-white p-2 font-bold hover:bg-orange-600 rounded-md px-8'>
                        {myPost ?
                            <>{isLoading ? "Updating Post..." : "Update Post"}</> :
                            <>{isLoading ? "Creating Post..." : "Create Post"}</>}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default PostForm;
