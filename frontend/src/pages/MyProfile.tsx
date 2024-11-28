import { useState } from 'react'
import { UserInformation } from '../components/UserInformation';
import { Tab } from '../constants/MyProfileTabs';
import ProfileTabLinks from '../components/myprofile/ProfileTabLinks';
import MyProfileInfoCard from '../components/myprofile/MyProfileInfoCard';
import MyFriends from '../components/myprofile/friends/MyFriends';
import AllMyPosts from '../components/myprofile/AllMyPosts';


const MyProfile = () => {
  const [selectedTab, setSelectedTab] = useState(Tab.INFO);
  const tabsClickHandler = (tabName: number) => {
    setSelectedTab(tabName);
  }

  return (
    <div className='w-full xl:w-2/3 m-auto h-auto md:h-auto bg-white rounded-xl flex justify-around items-start sm:items-between overflow-hidden' >
      <div className='h-auto border rounded-md border-gray-200 mt-6 pb-5 overflow-hidden'>
        <MyProfileInfoCard />
        <ProfileTabLinks {...{ selectedTab, tabsClickHandler }} />
      </div>
      <div className='mt-6'>
        {selectedTab === Tab.INFO &&
          <UserInformation />
        }
        {selectedTab === Tab.FRIENDS && <MyFriends />}
        {selectedTab === Tab.POSTS && <AllMyPosts />}
      </div>

    </div>
  )
}

export default MyProfile;


//slight downfall when using spread operator to pass down props
// If your object contains more properties than the component expects,
// those extra props will also be passed down. This could potentially
// cause unexpected behavior if the component uses those prop names for
// other purposes.
