import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import PostDetailsInputs from '../ui/PostDetailsInputs'
import { UserPersonalBEPostType } from '../../types/BackendTypes';
import { UserPersonalPostType } from '../CreatePost';
import { useMutation } from 'react-query';
import * as myPersonalPostApis from '../../apis/myposts.api';
import { useAppContext } from '../../contexts/useAppContext';
import { useNavigate } from 'react-router-dom';

type props = {
    myPost?: UserPersonalBEPostType;
}

const PostForm = ({ myPost }: props) => {

    const formMethods = useForm<UserPersonalPostType>();

    const { handleSubmit, reset, resetField } = formMethods;

    const { showToast } = useAppContext();
    const navigate = useNavigate();


    useEffect(() => {
        reset(myPost);
    }, [myPost, reset]);



    const { mutate, isLoading } = useMutation(myPersonalPostApis.createMyNewPost, {
        onSuccess: async () => {
            resetField('title');
            resetField('recipe');
            resetField('images');
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

    const createMyNewPostSubmitHandler = handleSubmit((formDataJson: UserPersonalPostType) => {
        const formData = new FormData();

        if (myPost) {
            formData.append("postId", myPost._id);
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

        handlePostForm(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form className='w-full p-3 mx-3' onSubmit={createMyNewPostSubmitHandler}>
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