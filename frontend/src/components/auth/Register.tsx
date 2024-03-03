import React from 'react'

const Register = () => {
    return (
        <form className='m-auto flex flex-col justify-between items-center w-full h-96 transition-all duration-500'>
            <div className="w-full h-2/3 px-3 flex flex-col justify-between">
                <label className='text-gray-600 w-full px-3 text-sm'>
                    First Name
                    <input type="text" className='w-full border-b rounded mt-2' />
                </label>
                <label className='text-gray-600 w-full px-3 text-sm mt-2'>
                    Last Name
                    <input type="text" className='w-full border-b rounded mt-2' />
                </label>
                <label className='text-gray-600 w-full px-3 text-sm mt-2'>
                    Email
                    <input type="email" className='w-full border-b rounded mt-2' />
                </label>
                <label className='text-gray-600 w-full px-3 text-sm mt-2'>
                    Choose Yummy Username
                    <input type="text" className='w-full border-b rounded mt-2' />
                </label>
                <label className='text-gray-600 w-full px-3 mt-2 text-sm'>
                    Password
                    <input type="password" className='w-full  border-b  rounded mt-2' />
                </label>
                <label className='text-gray-600 w-full px-3 mt-2 text-sm'>
                    Confirm Password
                    <input type="password" className='w-full  border-b  rounded mt-2' />
                </label>
            </div>
            <button type='submit' className='mt-4 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-lg px-8 w-full'>Register</button>
        </form>
    )
}

export default Register