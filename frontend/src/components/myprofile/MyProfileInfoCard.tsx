import React, { useRef } from 'react'
import Modal from '../ui/Modal';
import { Avatars } from '../Avatars';
import { useAppSelector } from '../../store/dispatchHooks';


const MyProfileInfoCard: React.FC = () => {

    const {user, avatarOptions} = useAppSelector(state => state.userprofile);

    const dialog = useRef<HTMLDialogElement>(null);

    const modalOpenHandler = () => {
        dialog.current?.showModal();
    }

    const modalCloseHandler = () => {
        dialog.current?.close();
    }


    return (
        <><div className='w-full h-40 md:h-56 relative'>
            <div className='aspect-square w-full h-full bg-tomato' style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
            </div>
            <div className='absolute top-5 left-0 w-full h-full flex flex-col justify-center items-center'>
                <div onClick={modalOpenHandler} className='group w-16 h-16 md:w-[90px] md:h-[90px] rounded-full cursor-pointer flex flex-col justify-center items-center overflow-hidden hover:border-2 hover:border-transparent'>
                    <img src={user?.avatar?.url} alt={user?.avatar.name + user?.username + "avatar"} className='group-hover:brightness-75' />
                    <div className='opacity-0 group-hover:opacity-100 text-xs font-semibold absolute text-white'>Change Avatar</div>
                </div>
                <h2 className='text-base md:text-lg font-medium md:font-bold'>{user?.firstname + ' ' + user?.lastname}</h2>
                <p className='text-xs md:text-sm'>@{user?.username}</p>
            </div>
        </div>
            <Modal ref={dialog}>
                {/* Its a 1 list inside list so given its index avatarOptions[0] to retrieve it(bad DB design) */}
                <Avatars avatars={avatarOptions[0]} modalCloseHandler={modalCloseHandler}
                />
            </Modal>
        </>
    )
}

export default MyProfileInfoCard
