import React from 'react'
import { Tab } from '../../constants/MyProfileTabs';



interface ProfileTabLinksPropTypes {
    tabsClickHandler: (tabName: number) => void;
    selectedTab: number;
}



const ProfileTabLinks: React.FC<ProfileTabLinksPropTypes> = ({ tabsClickHandler, selectedTab }) => {
    return (
        <>
            <ul className='w-full'>
                <li
                    onClick={() => tabsClickHandler(Tab.INFO)}
                    className={`${selectedTab === Tab.INFO && 'bg-orange-100'} rounded-md  hover:bg-orange-50 py-2 md:py-3 mx-1 text-center cursor-pointer text-sm md:text-auto`}
                >
                    My Information
                </li>
                <li
                    onClick={() => tabsClickHandler(Tab.FRIENDS)}
                    className={`${selectedTab === Tab.FRIENDS && 'bg-orange-100'} rounded-md  hover:bg-orange-50 py-2 md:py-3 mx-1 text-center cursor-pointer text-sm md:text-auto`}
                >
                    Friends
                </li>
                <li
                    onClick={() => tabsClickHandler(Tab.POSTS)}
                    className={`${selectedTab === Tab.POSTS && 'bg-orange-100'} rounded-md  hover:bg-orange-50 py-2 md:py-3 mx-1 text-center cursor-pointer text-sm md:text-auto`}
                >
                    My Posts
                </li>
                <li
                    onClick={() => tabsClickHandler(Tab.CHANGEPASS)}
                    className={`${selectedTab === Tab.CHANGEPASS && 'bg-orange-100'} rounded-md  hover:bg-orange-50 py-2 md:py-3 mx-1 text-center cursor-pointer text-sm md:text-auto`}
                >
                    Change Password
                </li>
                <li
                    onClick={() => tabsClickHandler(Tab.LOGOUT)}
                    className={`${selectedTab === Tab.LOGOUT && 'bg-orange-100'} rounded-md  hover:bg-orange-50 py-2 md:py-3 mx-1 text-center cursor-pointer text-sm md:text-auto`}
                >
                    Log out
                </li>
            </ul>
        </>
    )
}

export default ProfileTabLinks;