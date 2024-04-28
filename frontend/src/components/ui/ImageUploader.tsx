import { useFormContext } from 'react-hook-form';
import { UserPersonalPostType } from '../CreatePost';
import { MouseEvent } from 'react';


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
                    <img src={url} alt={`Post ${index}`} className='min-h-full object cover' />
                    <button onClick={(e) => ImageDeleteHandler(e, url)} className='bg-tomato text-lg font-normal flex items-center rounded-md text-white px-3 hover:bg-red-500'></button>
                  </div>
                ))
              }
            </div>
          )
        }

        <input
          type="file"
          multiple accept='image/*'
          className='w-full p-2.5 text-gray-700 font-normal'
          {...register('images', {
            validate: (images) => {
              const arrLength = images.length + (existingImages?.length || 0);
              if (arrLength === 0) {
                return "Ateast one image is required!"
              }
              if (arrLength > 6) {
                return "Cannot upload images more than 4!"
              }
              return true;
            }
          })}
        />
      </div>
      {errors.images && (
        <span className='text-red-500 text-xs font-bold'>{errors.images.message}</span>
      )}
    </div>
  )
}


export default ImageUploader