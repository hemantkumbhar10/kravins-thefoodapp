import { Link } from 'react-router-dom';
import logo from '../../assets/svgs/Logo-fill-color.svg';
import CustomLink from '../ui/CustomLink';
import { IoCreate } from "react-icons/io5";
import { PiBowlFoodFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <div className='py-3 px-5 bg-tomato flex items-center justify-center'>
      <div className='container flex justify-between items-center'>
        <div className="flex justify-start items-center">
          <Link to="/" className=''><img src={logo} alt="Kravins logo" aria-hidden width={40} height={40} className='md:w-12'/></Link>
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
        </div>
        <CustomLink to='/login' linkname='Login'/>
      </div>
    </div>
  )
}

export default Header