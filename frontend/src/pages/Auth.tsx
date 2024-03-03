import { useState } from 'react'
import Login from '../components/auth/Login'
import logo from '../assets/svgs/kravins-logo.svg';
import Register from '../components/auth/Register';
import { Link } from 'react-router-dom';

const Auth = () => {

    const [isLoginComponentClicked, setIsLoginComponentClicked] = useState(true);



    return (
        <div className='min-h-screen font-sans bg-tomato flex'>
            <div className="m-auto w-1/4 flex flex-col justify-center items-between bg-white p-8 rounded-xl">
                <div className="w-full flex flex-col justify-center items-center mb-5">
                    <Link to='/'><img src={logo} alt="Kravins logo" aria-hidden className='w-12 mb-7' /></Link>
                    <div className="w-full flex justify-between align-end">
                        <span
                            className={`w-1/2 font-bold pb-2 text-center text-base text-gray-900 ${isLoginComponentClicked && 'text-tomato border-b border-tomato'} cursor-pointer  transition-all duration-300`}
                            onClick={() => setIsLoginComponentClicked(true)}
                        >
                            Login
                        </span>
                        <span
                            className={`w-1/2 font-bold pb-2  text-center text-base text-gray-900 ${!isLoginComponentClicked && 'text-tomato border-b border-tomato'} cursor-pointer  transition-all duration-300`}
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