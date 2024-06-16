import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/svgs/Logo-fill-color.svg';
import CustomLink from '../ui/CustomLink';
import { IoCreate } from "react-icons/io5";
import { PiBowlFoodFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
// import { IoMenu } from "react-icons/io5";
// import { IoCloseOutline } from "react-icons/io5";
import { useAppContext } from '../../contexts/useAppContext';
import { useMutation, useQueryClient } from 'react-query';
import * as userAuthApiClient from '../../apis/auth.api';
import Modal from '../ui/Modal';
import CreatePost from '../CreatePost';
import { useAppSelector } from '../../store/dispatchHooks';


const profileDropdownOptions = [
  { value: 'myProfile', label: 'Profile' },
]

const Header = () => {
  const { isLoggedIn, showToast } = useAppContext();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user_avatar = useAppSelector(state=> state.userprofile.user_avatar);
  const dialog = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation(userAuthApiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: 'You are logged out!', type: 'SUCCESS' });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    }
  })

  const onLogout = () => {
    mutation.mutate();
  }

  const modalOpenHandler = () => {
    dialog.current?.showModal();
  }

  const modalCloseHandler = () => {
    dialog.current?.close();
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='py-3 px-5 bg-tomato'>
      <div className='container flex justify-between'>
        <Link to="/" className=''><img src={logo} alt="Kravins logo" aria-hidden width={40} height={40} className='md:w-12' /></Link>
        <div className='flex flex-row justify-between items-center'>
          {isLoggedIn &&
            <div className="fixed md:relative w-full md:w-auto py-1 md:py-0 left-0 bottom-0 bg-tomato md:bg-transparent flex flex-row items-start md:items-center justify-evenly md:justify-start md:ml-10">
              <div onClick={modalOpenHandler} className="flex flex-col items-center justify-between md:ml-3 hover:scale-105">
                <span className='block m-auto' aria-hidden>
                  <IoCreate className='text-white text-2xl' />
                </span>
                <span className='text-sm text-white m-auto'>Create Post</span>
              </div>
              <Link to='/' className="flex flex-col items-center justify-between md:ml-3 hover:scale-105">
                <span className='block m-auto' aria-hidden>
                  <PiBowlFoodFill className='text-white text-2xl' />
                </span>
                <span className='text-sm text-white m-auto'>Kravins</span>
              </Link>
              <Link to='/' className="flex flex-col items-center justify-between md:ml-3 hover:scale-105">
                <span className='block m-auto' aria-hidden>
                  <IoIosNotifications className='text-white text-2xl' />
                </span>
                <span className='text-sm text-white m-auto'>Notifications</span>
              </Link>
            </div>
          }

          {!isLoggedIn && <CustomLink to='/login' linkname='Login' />}
          {
            isLoggedIn && <>
              <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                ref={dropdownRef}
                className='ml-2 relative'
              >
                <img
                  src={user_avatar}
                  alt="user profile avatar"
                  className='w-10 md:w-11 rounded-full'
                  role='button'
                  tabIndex={0}
                />
                {isProfileDropdownOpen &&

                  <ul className='absolute top-14 right-0 bg-orange-100 p-2 px-3 rounded-md w-24'>
                    {profileDropdownOptions.map((option, index) => {
                      return (
                        <li key={option.label + index} className='w-full'><Link to={`/${option.value}`} className='text-tomato text-sm'>{option.label}</Link></li>
                      )
                    })}
                    <li onClick={onLogout} className='cursor-pointer text-tomato text-sm w-full'>Log out</li>
                  </ul>
                }
              </div>
            </>
          }
        </div>
      </div>
      <Modal ref={dialog}>
        <CreatePost modalCloseHandler={modalCloseHandler} />
      </Modal>
    </div>
  )
}

export default Header