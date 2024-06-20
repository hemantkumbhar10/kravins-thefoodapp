import { useState } from 'react'
import SearchFriends from './SearchFriends';
import ConnectedFriends from './ConnectedFriends';


const MyFriends = () => {

    const [selectedTab, setSelectedTab] = useState(0);


    const tabsHandler = (tab: number) => {
        setSelectedTab(tab);
    }

    const tabsClass = `h-full p-2 md:p-3 w-2/4 text-center rounded-lg cursor-pointer font-semibold text-xs md:text-auto`

    return (
        <div className='flex flex-col justify-around p-2 md:p-5 border rounded-lg border-gray-200 mb-5 w-60 md:w-[30rem]'>
            <div className='w-full md:w-full m-auto h-auto flex justify-around items-center rounded-lg bg-gray-200 mb-5'>
                <span onClick={() => tabsHandler(0)} className={`${selectedTab === 0 ? 'bg-tomato text-gray-100 ' : 'text-tomato'} ${tabsClass}`} role='button'>My Friends</span>
                <span onClick={() => tabsHandler(1)} className={`${selectedTab === 1 ? 'bg-tomato text-gray-100 ' : 'text-tomato'} ${tabsClass}`} role='button'>Find People</span>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////// */}
            {selectedTab === 0 && <div className='w-60'><ConnectedFriends /></div>}
            {selectedTab === 1 && <SearchFriends />}


        </div>
    )
}

export default MyFriends;