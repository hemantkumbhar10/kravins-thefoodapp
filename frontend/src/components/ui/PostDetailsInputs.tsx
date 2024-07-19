import ImageUploader from './ImageUploader'
import { useFormContext } from 'react-hook-form'
import { UserPersonalPostType } from '../CreatePost';

const PostDetailsInputs = () => {

    const { register, formState: { errors } } = useFormContext<UserPersonalPostType>();

    return (
        <>
            <div className="flex flex-col justify-start items-start mb-3">
                <label className='w-full mb-2 text-sm font-medium text-gray-900' htmlFor='title'>
                    Title
                </label>
                <input id='title' type='text'
                    className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your caption here..."
                    {...register("title", { required: "Title is required!" })}
                />
                {
                    errors.title && (
                        <span className='text-red-500 text-xs font-normal pl-1 pt-1'>{errors.title.message}</span>
                    )
                }
            </div>

            <div className="flex flex-col justify-start items-start mb-3">
                <label className='w-full mb-2 text-sm font-medium text-gray-900' htmlFor='recipe'>
                    Recipe
                </label>
                <textarea id='recipe'
                    rows={10}
                    className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write your recipe or about yummy things here..."
                    {...register('recipe')}
                />
                {errors.recipe && (
                    <span className='text-red-500 text-xs font-bold pl-1 pt-1'>{errors.recipe.message}</span>
                )}
            </div>
            <ImageUploader />
        </>)
}

export default PostDetailsInputs