import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import PostDetailsInputs from '../ui/PostDetailsInputs'
import {UserPersonalBEPostType} from '../../types/BackendTypes';
import { UserPersonalPostType } from '../CreatePost';

type props ={
    postForm:(mypostFormData: FormData)=>void;
    isLoading:boolean;
    myPost?:UserPersonalBEPostType;
}

const PostForm = ({postForm, isLoading, myPost}:props) => {

    const formMethods = useForm<UserPersonalPostType>();

    const {handleSubmit, reset} = formMethods;

    useEffect(()=> {
        reset(myPost);
    },[myPost, reset]);

    const createMyNewPostSubmitHandler  = handleSubmit((formDataJson: UserPersonalPostType)=>{
        const formData = new FormData();

        if(myPost){
            formData.append("postId", myPost._id);
        }
        formData.append("title", formDataJson.title);
        formData.append("recipe", formDataJson.recipe);

        if(formDataJson.images && Array.isArray(formDataJson.images)){
            formDataJson.images.forEach((url, index)=>{
                formData.append(`images[${index}]`, url);
            })
        }

        Array.from(formDataJson.images).forEach((file)=>{
            formData.append('images', file);
        })

        postForm(formData);

    });

    return (
        <FormProvider {...formMethods}>
            <form className='p-3 mx-3 border-b-2 rounded-md' onSubmit={createMyNewPostSubmitHandler}>
                <PostDetailsInputs />
                <span className="flex justify-end">
                    <button disabled={isLoading} type='submit' className='text-sm bg-purple-500 text-white p-2 font-bold hover:bg-purple-400 rounded-md px-8'>
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