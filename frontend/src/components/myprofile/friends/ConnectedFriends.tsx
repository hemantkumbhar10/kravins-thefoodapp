// import React from 'react'
// import { useAppSelector } from '../../../store/dispatchHooks'

import * as friendsApiClient from '../../../apis/friends.api'

import { useQuery } from "react-query"
import FriendCard from './FriendCard';

const ConnectedFriends = () => {
  //   const {friends} = useAppSelector(state=>state.userprofile);

  const { data: friends } = useQuery('friendInfos', () => friendsApiClient.getFriendsInfos());
  const { data: friendsRequests } = useQuery('friendRequestsInfos', () => friendsApiClient.getFriendRequestInfos());


  return (
    <>
      {friendsRequests?.[0] &&
        <div>
          <h3 className='text-xs font-semibold'>Friend Requests</h3>
          <div className='grid w-full h-[12rem] md:h-[15rem] pb-10 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 mt-1 overflow-y-scroll'>
            {friendsRequests?.map((friend) => (
              <FriendCard key={friend.friendId} firstname={friend.firstname} lastname={friend.lastname} avatar={friend.avatar} username={friend.username} />
            ))}
          </div>
        </div>
      }
      {
        friends?.[0] &&
        <div>
          <h3 className='text-xs font-semibold mt-1'>Friends</h3>
          <div className='grid w-full h-[12rem] md:h-[15rem]  pb-10 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 mt-1 overflow-y-scroll'>
            {friends?.map((friend) => (
              <FriendCard key={friend.friendId} firstname={friend.firstname} lastname={friend.lastname} avatar={friend.avatar} username={friend.username} />
            ))}
          </div>
        </div>
      }
    </>
  )
}

export default ConnectedFriends