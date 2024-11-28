import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/dispatchHooks";
import { useMutation } from "react-query";
import * as userProfileApiClient from '../apis/myprofile.api';
import { useAppContext } from "../contexts/useAppContext";
import { getUserProfileData } from "../store/userProfile-slice";


type AvatarsProps =
    {
        modalCloseHandler: () => void;
        avatars: {
            [key: string]: string;
        };
    }



export const Avatars: React.FC<AvatarsProps> = ({ modalCloseHandler, avatars }) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const userAvatar = useAppSelector(state => state.userprofile.user.avatar.url);
    const { showToast } = useAppContext();
    const dispatch = useAppDispatch();

    useEffect((
    ) => {
        setSelectedAvatar(userAvatar);
    }, [userAvatar])

    const selectAvatar = (avatarURL: string) => {
        setSelectedAvatar(avatarURL);
    }

    const mutation = useMutation(userProfileApiClient.updateMyAvatar, {
        onSuccess: () => {
            dispatch(getUserProfileData());
            showToast({ message: "Avatar changed!", type: 'SUCCESS' });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    })

    const updateUserAvatar = () => {
        const avatarName = Object.keys(avatars).find((key) => selectedAvatar === avatars[key]);
        if (selectedAvatar !== userAvatar) {
            mutation.mutate({ avatarName: avatarName });
        }
        modalCloseHandler();
    }

    return (
        <div>
            <h3 className='text-xl font-bold pl-5 pb-5 border-b-2 border-gray-200 text-tomato'>Choose Your Avatar</h3>
            <div className="w-full flex flex-col justify-center items-center">
                <div className='p-3 mx-3 grid grid-cols-3 md:grid-cols-5 md:grid-rows-2 gap-x-4 gap-y-4'>
                    {
                        Object.keys(avatars).map((key) => (
                            key !== '_id' &&
                            <img
                                onClick={() => selectAvatar(avatars[key])}
                                key={key}
                                src={avatars[key]}
                                alt={`${key} avatar`}
                                className={`${avatars[key] === selectedAvatar ? 'border-[3px] border-tomato' : avatars[key] === userAvatar ? 'shadow-tomato shadow-xl' : ''} w-[90px] rounded-full cursor-pointer hover:border-2 hover:border-blue-300`}
                                role="button"
                            />
                        ))
                    }
                </div>
                <span className="flex justify-end mt-3 mb-5">
                    <button onClick={updateUserAvatar} className='text-sm bg-tomato text-white p-2 font-bold hover:bg-orange-600 rounded-md px-8' >
                        Update Avatar
                    </button>
                </span>
            </div>
        </div>
    )
}
