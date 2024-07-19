import { FormEvent, useState, useImperativeHandle, forwardRef } from 'react'
import { FriendsSearchResponse } from '../../../types/BackendTypes';
import { useQueryClient } from 'react-query';
import { TbUserSearch } from 'react-icons/tb';
import * as searchApiClient from '../../../apis/search.api';

type FriendsSearchBarPropType = {
    page: number;
    getSearchedResult: (data: FriendsSearchResponse) => void;
}

export type FriendsSearchBarHandlePropType = {
    searchData: (page: number) => void
}


const FriendsSearchBar = forwardRef<FriendsSearchBarHandlePropType, FriendsSearchBarPropType>(({ page, getSearchedResult }, ref) => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    const queryClient = useQueryClient();


    const data = async (page: number) => {
        const data = await queryClient.fetchQuery(['searchFriends', { name }], () => searchApiClient.searchFriends({ name, page }));
        getSearchedResult(data);
    }

    useImperativeHandle(ref, () => ({
        searchData(page: number) {
            data(page);
        }
    }));

    const formSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (name.trim() === '') {
            page = 1;
            setError(true);
            return;
        }
        data(page);
    }


    return (
        <form className="w-full flex flex-col justify-center items-center" onSubmit={formSubmitHandler}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search Friends</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <TbUserSearch className='text-gray-400 text-sm md:text-xl' />
                </div>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="search" id="default-search"
                    className={`${error && 'border-red-500 placeholder-red-300'} block w-full py-1 md:py-4 ps-7 md:ps-10 text-xs md:text-sm text-gray-900 border border-gray-300 rounded-md md:rounded-lg bg-gray-100 focus:ring-orange-200 focus:border-orange-200 tracking-tighter md:tracking-normal`}
                    placeholder={error ? 'Enter valid input' : 'Search for friends by name or email'}
                    onFocus={() => setError(false)}
                    aria-required
                />
                <button type="submit" className="text-white absolute end-0 md:end-2.5 bottom-[1px] md:bottom-2.5 bg-orange-600 hover:bg-orange-800 focus:ring-2 focus:outline-none focus:ring-orange-300 font-semibold md:font-medium rounded-md md:rounded-lg text-xs md:text-sm px-2 py-1 md:px-4 md:py-2">Search</button>
            </div>
        </form>
    )
})

export default FriendsSearchBar