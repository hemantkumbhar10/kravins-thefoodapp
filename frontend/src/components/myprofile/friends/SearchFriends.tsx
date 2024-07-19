import { useRef, useState } from 'react'
import { FriendsSearchResponse } from '../../../types/BackendTypes';
import SearchFriendResults from './SearchFriendResults';
import FriendsSearchBar, { FriendsSearchBarHandlePropType } from './FriendsSearchBar';
import Pagination from '../../ui/Pagination';

const SearchFriends = () => {
    const [peoplesData, setPeoplesData] = useState<FriendsSearchResponse>();
    const [page, setPage] = useState<number>(1);

    const paginationRef = useRef<FriendsSearchBarHandlePropType>(null);

    const getSearchedResult = (data: FriendsSearchResponse) => {
        setPeoplesData(data);
    }

    const paginationHandler = (page: number) => {
        setPage(page);
    }

    return (
        <div className="w-full flex flex-col justify-center items-center overflow-hidden">
            <FriendsSearchBar getSearchedResult={getSearchedResult} page={page} ref={paginationRef} />
            <div className='grid w-full h-[23rem] md:h-[30rem] pb-10 grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 mt-3 overflow-y-scroll'>
                <SearchFriendResults peoplesData={peoplesData?.data} />
            </div>
            <div className="">
                {peoplesData &&
                    <Pagination dataHandlerRef={paginationRef} page={peoplesData.pagination.page} pages={peoplesData.pagination.pages} onPageChange={paginationHandler} />
                }
            </div>
        </div>
    )
}

export default SearchFriends;