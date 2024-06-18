import React from 'react'
import { FriendsInfoReturnType } from '../../types/BackendTypes'


type SearchFriendResultsPropType = {
    peoplesData: FriendsInfoReturnType[] | undefined
}

const SearchFriendResults: React.FC<SearchFriendResultsPropType> = ({ peoplesData }) => {

    return (
        <>
            {peoplesData?.map((person) => (
                <div className="h-48 md:h-56 max-w-sm bg-white border border-gray-200 rounded-lg shadow p-1 md:p-2 " key={person.friendId}>
                    <div className="flex flex-col items-center p-2">
                        <img className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-full shadow-lg" src={person.avatar} alt={person.firstname + " " + person.lastname} />
                        <h6 className="mb-1 text-sm md:text-base font-medium text-gray-900 text-center">{person.firstname + " " + person.lastname}</h6>
                        <span className="text-xs text-gray-500">@{person.username}</span>
                        <div className="flex mt-2">
                            <a href="#" className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 text-xs font-medium text-center text-gray-800 bg-orange-300 rounded-lg hover:bg-orange-200 focus:ring-2 focus:outline-none focus:ring-orange-100">Add friend</a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SearchFriendResults