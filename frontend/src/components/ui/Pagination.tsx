import React from 'react'
import { FriendsSearchBarHandlePropType } from '../myprofile/FriendsSearchBar';

export type PaginationPropType = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
    dataHandlerRef: React.RefObject<FriendsSearchBarHandlePropType>
}

const Pagination: React.FC<PaginationPropType> = ({ page, pages, onPageChange, dataHandlerRef }) => {

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }


    const pageChangeHandler = (pageNumber: number) => {
        onPageChange(pageNumber);
        dataHandlerRef.current?.searchData(pageNumber);
    }

    return (
        <>
            <div className='flex justify-center'>
                <ul className='flex bg-orange-300 p-1 rounded-lg'>
                    {
                        pageNumbers.map((number) => (
                            <li key={number + ''} className={`px-4 py2 rounded-full border-none text-white ${page === number ? "bg-tomato" : ""}`}
                            >
                                <button className='text-white' onClick={() => pageChangeHandler(number)}>{number}</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Pagination;