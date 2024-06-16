import { useRef } from 'react'
import { UserInformation } from '../components/UserInformation';
import Modal from '../components/ui/Modal';
import { Avatars } from '../components/Avatars';
import { useAppSelector } from '../store/dispatchHooks';

const MyProfile = () => {

  const dialog = useRef<HTMLDialogElement>(null);

  const { _id, email, username, firstname, lastname, user_avatar, avatarOptions } = useAppSelector(state => state.userprofile);


  const modalOpenHandler = () => {
    dialog.current?.showModal();
  }

  const modalCloseHandler = ()=>{
    dialog.current?.close();
  }

  return (
    <div className='w-full h-auto md:h-auto bg-white rounded-xl flex justify-start items-start' >
      <div className='h-auto border rounded-md border-gray-200 mt-6 pb-5 overflow-hidden'>
        <div className='w-full h-56 relative'>
          <div className='aspect-square w-full h-full bg-tomato' style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
          </div>
          <div className='absolute top-5 left-0 w-full h-full flex flex-col justify-center items-center'>
            <div onClick={modalOpenHandler} className='group w-[90px] h-[90px] rounded-full cursor-pointer flex flex-col justify-center items-center overflow-hidden hover:border-2 hover:border-transparent'>
              <img src={user_avatar} alt="" className='group-hover:brightness-75'/>
              <div className='opacity-0 group-hover:opacity-100 text-xs font-semibold absolute text-white'>Change Avatar</div>
            </div>
            <h2 className='text-lg font-bold'>{firstname + ' ' + lastname}</h2>
            <p className='text-sm'>@{username}</p>
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
          _id={_id}
          email={email}
          firstname={firstname}
          lastname={lastname}
          username={username}
        />
      </div>
      <Modal ref={dialog}>
        {/* Its a 1 list inside list so given its index avatarOptions[0] to retrieve it(bad DB design) */}
        <Avatars avatars={avatarOptions[0]} modalCloseHandler={modalCloseHandler}
        />
      </Modal>
    </div>
  )
}

export default MyProfile;


