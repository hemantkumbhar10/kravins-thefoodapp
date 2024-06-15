import { useState } from 'react'
import { UserInformation } from '../components/UserInformation';
import Modal from '../components/ui/Modal';
import { Avatars } from '../components/Avatars';
import { useQuery } from 'react-query';

import * as userProfileApi from '../apis/myprofile.api';






const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: myProfile } = useQuery('fetchQuery', () => userProfileApi.fetchMyProfile());

  console.log(myProfile);


  const modalOpenHandler = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className='w-full h-auto md:h-auto bg-white rounded-xl flex justify-start items-start' >
      <div className='h-auto border rounded-md border-gray-200 mt-6 pb-5 overflow-hidden'>
        <div className='w-full h-56 relative'>
          <div className='aspect-square w-full h-full bg-tomato' style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
          </div>
          <div className='absolute top-5 left-0 w-full h-full flex flex-col justify-center items-center'>
            <img src={myProfile?.avatar} alt="" className='w-[90px] h-[90px] rounded-full cursor-pointer' onClick={modalOpenHandler} />
            <h2 className='text-lg font-bold'>{myProfile?.user.firstname + ' ' + myProfile?.user.lastname}</h2>
            <p className='text-sm'>@{myProfile?.user.username}</p>
          </div>
        </div>
        <ul className='w-full'>
          <li className='rounded-md  hover:bg-orange-100 py-3 mx-1 text-center cursor-pointer'>My Information</li>
          <li className='rounded-md  hover:bg-orange-100 py-3 mx-1 text-center cursor-pointer'>Friends</li>
          <li className='rounded-md  hover:bg-orange-100 py-3 mx-1 text-center cursor-pointer'>My Posts</li>
          <li className='rounded-md  hover:bg-orange-100 py-3 mx-1 text-center cursor-pointer'>Change Password</li>
          <li className='rounded-md hover:bg-orange-100 py-3 mx-1 text-center cursor-pointer'>Log out</li>
        </ul>
      </div>
      <div className='mt-6 md:ml-56'>
        <UserInformation
          _id={myProfile?.user._id ? myProfile?.user._id : ''}
          email={myProfile?.user.email ? myProfile?.user.email : ''}
          firstname={myProfile?.user.firstname ? myProfile?.user.firstname : ''}
          lastname={myProfile?.user.lastname ? myProfile?.user.lastname : ''}
          username={myProfile?.user.username ? myProfile?.user.username : ''}
        />
      </div>
      <Modal modalOpenHandler={modalOpenHandler} isModalOpen={isModalOpen}>
        <Avatars avatars={myProfile ? myProfile.avatarOptions[0] : {}}
        />
      </Modal>
    </div>
  )
}

export default MyProfile;


