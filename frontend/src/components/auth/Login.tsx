import React from 'react'

const Login = () => {
    return (
        <form className='m-auto flex flex-col justify-between items-center w-full h-96 transition-all duration-500'>
            <div className="w-full h-2/5 px-3 flex flex-col justify-between">
                <label className='text-gray-600 w-full text-sm'>
                    Email
                    <input type="email" className='w-full border-b rounded mt-5' />
                </label>
                <label className='text-gray-600 w-full text-sm '>
                    Password
                    <input type="email" className='w-full  border-b  rounded mt-5' />
                </label>
            </div>
            <button type='submit' className='mt-4 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-lg px-8 w-full'>Login</button>
        </form>
    )
}

export default Login