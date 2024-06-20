import React from 'react';
import { FriendsInfoReturnType } from '../../../types/BackendTypes'
import FriendCard from './FriendCard';


type SearchFriendResultsPropType = {
    peoplesData: FriendsInfoReturnType[] | undefined
}

const SearchFriendResults: React.FC<SearchFriendResultsPropType> = ({ peoplesData }) => {

    return (
        <>
            {peoplesData?.map((person) => (
                <FriendCard key={person.friendId} firstname={person.firstname} lastname={person.lastname} avatar={person.avatar} username={person.username} />
            ))}
        </>
    )
}

export default SearchFriendResults