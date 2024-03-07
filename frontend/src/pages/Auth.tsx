import { useState } from 'react'
import Login from '../components/auth/Login'
import logo from '../assets/svgs/Logo-fill-color.svg';
import Register from '../components/auth/Register';
import { Link } from 'react-router-dom';
import './Auth.css';

const Auth = () => {

    const [isLoginComponentClicked, setIsLoginComponentClicked] = useState(true);



    return (
        <div className='auth_main doodlebg'>
            <div className='auth_container'>
                <div className="auth_nav">
                    <Link to='/'>
                        <img
                            src={logo}
                            alt="Kravins logo"
                            aria-hidden className='w-20 md:w-12 mb-7 border border-slate-100 rounded-md' />
                    </Link>
                    <div
                        className="w-3/4 md:w-full flex justify-between align-end">
                        <span
                            className={`auth_nav_title ${isLoginComponentClicked ? 'text-tomato border-b-4 border-tomato' : 'border-b-4 border-white'}`}
                            onClick={() => setIsLoginComponentClicked(true)}
                        >
                            Login
                        </span>
                        <span
                            className={`auth_nav_title ${!isLoginComponentClicked ? 'text-tomato border-b-4 border-tomato' : 'border-b-4 border-white'}`}
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