import { useState } from 'react'
import { UserInformation } from '../components/UserInformation';
import { useAppSelector } from '../store/dispatchHooks';
import { Tab } from '../constants/MyProfileTabs';
import ProfileTabLinks from '../components/myprofile/ProfileTabLinks';
import MyProfileInfoCard from '../components/myprofile/MyProfileInfoCard';
import MyFriends from '../components/myprofile/MyFriends';

const MyProfile = () => {

  const [selectedTab, setSelectedTab] = useState(Tab.INFO);
  const { _id, email, username, firstname, lastname, user_avatar, avatarOptions } = useAppSelector(state => state.userprofile);

  const tabsClickHandler = (tabName: number) => {
    setSelectedTab(tabName);
  }

  return (
    <div className='w-full xl:w-2/3 m-auto h-auto md:h-auto bg-white rounded-xl flex justify-around items-start sm:items-between overflow-hidden' >
      <div className='h-auto border rounded-md border-gray-200 mt-6 pb-5 overflow-hidden'>
        <MyProfileInfoCard {...{ avatarOptions, firstname, lastname, user_avatar, username }} />
        <ProfileTabLinks {...{ selectedTab, tabsClickHandler }} />
      </div>
      <div className='mt-6'>
        {selectedTab === Tab.INFO &&
          <UserInformation {...{ _id, email, firstname, lastname, username }} />
        }
        {selectedTab === Tab.FRIENDS && <MyFriends />}
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