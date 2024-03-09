import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/svgs/Logo-fill-color.svg';
import CustomLink from '../ui/CustomLink';
import { IoCreate } from "react-icons/io5";
import { PiBowlFoodFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { useAppContext } from '../../contexts/useAppContext';
import { useMutation, useQueryClient } from 'react-query';
import * as userAuthApiClient from '../../apis/auth.api';

const Header = () => {
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

  return (
    <div className='py-3 px-5 bg-tomato flex items-center justify-center'>
      <div className='container flex justify-between items-center'>
        <div className="flex justify-start items-center">
          <Link to="/" className=''><img src={logo} alt="Kravins logo" aria-hidden width={40} height={40} className='md:w-12' /></Link>
          {isLoggedIn &&
            <div className="flex flex-row items-center justify-start md:ml-10">
              <Link to='/' className="flex flex-col items-center justify-between ml-3 hover:scale-105">
                <span className='block m-auto' aria-hidden>
                  <IoCreate className='text-white text-2xl' />
                </span>
                <span className='text-sm text-white m-auto'>Create Post</span>
              </Link>
              <Link to='/' className="flex flex-col items-center justify-between ml-3 hover:scale-105">
                <span className='block m-auto' aria-hidden>
                  <PiBowlFoodFill className='text-white text-2xl' />
                </span>
                <span className='text-sm text-white m-auto'>Kravins</span>
              </Link>
              <Link to='/' className="flex flex-col items-center justify-between ml-3 hover:scale-105">
                <span className='block m-auto' aria-hidden>
                  <IoIosNotifications className='text-white text-2xl' />
                </span>
                <span className='text-sm text-white m-auto'>Notifications</span>
              </Link>
            </div>
          }
        </div>
        {isLoggedIn ?
          <button
            className='bg-white text-md font-normal flex items-center rounded-md text-tomato px-3 py-1 hover:bg-gray-100 hover:scale-105 transition ease-linear duration-100'
            onClick={onLogout}
          >
            Log out
          </button> :
          <CustomLink to='/login' linkname='Login' />
        }
      </div>
    </div>
  )
}

export default Header