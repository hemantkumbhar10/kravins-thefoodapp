import { useState } from 'react'
import Login from '../components/auth/Login'
import logo from '../assets/svgs/Logo-fill-color.svg';
import Register from '../components/auth/Register';
import { Link } from 'react-router-dom';

const Auth = () => {

    const [isLoginComponentClicked, setIsLoginComponentClicked] = useState(true);



    return (
        <div className='h-screen font-sans bg-tomato flex'>
            <div className="m-auto w-full h-screen md:h-auto md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-between bg-gray-200 md:bg-white md:p-4 md:rounded-xl">
                <div className="w-full flex flex-col justify-end md:justify-center items-center mb-5 h-[40%] md:h-auto bg-white rounded-b-3xl rounded-bl-3xl ">
                    <Link to='/'><img src={logo} alt="Kravins logo" aria-hidden className='w-20 md:w-12 mb-7 border border-slate-100 rounded-md' /></Link>
                    <div className="w-3/4 md:w-full flex justify-between align-end">
                        <span
                            className={`w-1/2 font-bold pb-2 text-center text-base text-gray-900  ${isLoginComponentClicked ? 'text-tomato border-b-4 border-tomato' : 'border-b-4 border-white'} cursor-pointer  transition-all duration-300`}
                            onClick={() => setIsLoginComponentClicked(true)}
                        >
                            Login
                        </span>
                        <span
                            className={`w-1/2 font-bold pb-2  text-center text-base text-gray-900 ${!isLoginComponentClicked ? 'text-tomato border-b-4 border-tomato' : 'border-b-4 border-white'} cursor-pointer  transition-all duration-300`}
                            onClick={() => setIsLoginComponentClicked(false)}
                        >
                            Register
                        </span>
                    </div>
                </div>
                {isLoginComponentClicked ? <Login /> : <Register />}
            </div>
        </div>
    )
}

export default Auth