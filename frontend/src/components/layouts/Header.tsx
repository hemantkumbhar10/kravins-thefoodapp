import { useState } from 'react';
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

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    setIsModalOpen(!isModalOpen);
  }

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

          {isLoggedIn ?
            <button
              className='ml-3 bg-white text-sm md:text-md font-normal flex items-center rounded-md text-tomato  px-3 py-1 hover:bg-gray-100 hover:scale-105 transition ease-linear duration-100'
              onClick={onLogout}
            >
              Log out
            </button> :
            <CustomLink to='/login' linkname='Login' className='' />
          }
        </div>
      </div>

      {/* Menu button for user profile and logout functionality later */}
      {/* <div className="fixed right-5 top-5 md:hidden" onClick={}>
        <span className='m-auto' aria-hidden>
          {isMobileMenuOpen ? <IoCloseOutline className='text-white text-2xl' /> :
            <IoMenu className='text-white text-2xl' />}
        </span>
      </div> */}


      <Modal isModalOpen={isModalOpen} modalOpenHandler={modalOpenHandler} >
        <CreatePost modalOpenHandler={modalOpenHandler} />
      </Modal>
    </div>
  )
}

export default Header