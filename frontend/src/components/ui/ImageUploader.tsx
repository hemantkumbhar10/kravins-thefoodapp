import { useFormContext } from 'react-hook-form';
import { UserPersonalPostType } from '../CreatePost';


const ImageUploader = () => {

  const { register, formState: { errors }, watch, setValue } = useFormContext<UserPersonalPostType>();


  const existingImages = watch('images');

  function ImageDeleteHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imgUrl: string): void {
    e.preventDefault();
    setValue('images', existingImages.filter((url) => url !== imgUrl));
  }

  return (
    <div>
      <h2 className='w-full mb-2 text-sm font-medium text-gray-900'>Upload Images</h2>
      <div className='border rounded-md p4 flex flex-col gap-4'>
        {
          existingImages && Array.isArray(existingImages) && (
            <div className="grid grid-cols-6 gap-4">
              {
                existingImages.map((url, index) => (
                  <div className="relative group" key={url + "_" + index}>
                    <img src={url} alt={`Post ${index}`} className='min-h-full object-cover' />
                    <button onClick={(e) => ImageDeleteHandler(e, url)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                  </div>
                ))
              }
            </div>
          )
        }

        <input
          type="file"
          multiple
          accept='image/*'
          className='w-full p-2.5 text-gray-700 font-normal'
          {...register('postImages', {
            validate: (postImages) => {
              const arrLength = postImages.length + (existingImages?.length || 0);
              if (arrLength === 0) {
                return "Ateast one image is required!"
              }
              if (arrLength > 3) {
                console.log(existingImages?.length || 0);
                console.log(postImages);
                return "Cannot upload more than 3 images!"
              }
              return true;
            }
          })}
        />
      </div>
      {errors.postImages && (
        <span className='text-red-500 text-xs font-bold pl-1'>{errors.postImages.message}</span>
      )}
    </div>
  )
}


export default ImageUploader;
