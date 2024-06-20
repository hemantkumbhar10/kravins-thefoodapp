import React from 'react'
import { useMutation } from 'react-query';
import { getUserProfileData } from '../../../store/userProfile-slice';
import { useAppContext } from '../../../contexts/useAppContext';
import { useAppDispatch, useAppSelector } from '../../../store/dispatchHooks';
import * as friendsApiClient from '../../../apis/friends.api';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';



interface FriendCardPropType {
    avatar: string; 
    firstname: string; 
    lastname: string; 
    username: string
}


const FriendCard:React.FC<FriendCardPropType> = ({ avatar, firstname, lastname, username }) => {

    const dispatch = useAppDispatch();

    const { showToast } = useAppContext();

    const addFriendMutation = useMutation(friendsApiClient.addFriend, {
        onSuccess: (data, friendsUsername) => {
            dispatch(getUserProfileData());
            showToast({ message: `@${friendsUsername} is your friend now!`, type: 'SUCCESS' });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'WARNING' });
        }
    });

    const deleteFriendMutation = useMutation(friendsApiClient.deleteFriend, {
        onSuccess: () => {
            dispatch(getUserProfileData());
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    });

    const addFriendHandler = (friendsUsername: string) => {
        addFriendMutation.mutate(friendsUsername);
    }

    const deleteFriendHandler = (friendsUsername: string) => {
        deleteFriendMutation.mutate(friendsUsername);
    }

    const { friends } = useAppSelector(state => state.userprofile);



    return (
        <div className="h-48 md:h-56 max-w-sm bg-white border border-gray-200 rounded-lg shadow p-1 md:p-2 ">
            <div className=" h-full flex flex-col justify-between items-center p-2">

                <img className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-full shadow-lg" src={avatar} alt={firstname + " " + lastname} />
                <div className='flex flex-col justify-start items-center'>
                    <h6 className="text-sm md:text-base font-medium text-gray-900 text-center">{firstname + " " + lastname}</h6>
                    <span className="text-xs text-gray-500">@{username}</span>
                </div>
                <div className="w-full flex mb-0 justify-center items-end">
                    {!friends.friendsUsernames.includes(username) &&
                        < button
                            type='button'
                            onClick={() => addFriendHandler(username)}
                            className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 text-xs font-medium text-center text-gray-800 bg-orange-300 rounded-lg hover:bg-orange-200 focus:ring-2 focus:outline-none focus:ring-orange-100"
                        >
                            Add friend
                        </button>
                    }
                    {
                        friends.friendsUsernames.includes(username) && (
                            <div className="w-3/5 flex justify-between">
                                <button onClick={() => deleteFriendHandler(username)} type='button' aria-label='Delete Friend'><FaCheckCircle color='green' size={25} /></button>
                                <button aria-label='Message Friend'><BiSolidMessageRounded color='tomato' size={25} /></button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default FriendCard