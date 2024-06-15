import React from "react";


type AvatarsProps =
    {

        avatars: {
            [key: string]: string;
        };
    }



export const Avatars: React.FC<AvatarsProps> = ({ avatars }) => {

    // const avatar = localStorage.getItem('userAvatar')!;

    return (
        <div className='w-full md:w-2/4  bg-white rounded-xl'>
            <h3 className='text-xl font-bold p-5 border-b-2 border-gray-200 text-tomato'>Choose Your Avatar</h3>
            <div className="w-full flex flex-col justify-center items-center">
                <div className='p-3 mx-3 grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-4'>
                    {
                       Object.keys(avatars).map((key)=>(
                        key!=='_id' && <img key={key} src={avatars[key]} alt={`${key} avatar`} className="w-[90px] rounded-full cursor-pointer" role="button" />
                       ))
                    }
                </div>
                <span className="flex justify-end mt-3 mb-5">
                    <button type='submit' className='text-sm bg-tomato text-white p-2 font-bold hover:bg-orange-600 rounded-md px-8'>
                        Update Avatar
                        {/* {myPost ?
                            <>{isLoading ? "Updating Post..." : "Update Post"}</> :
                            <>{isLoading ? "Creating Post..." : "Create Post"}</>} */}
                    </button>
                </span>
            </div>
        </div>
    )
}
