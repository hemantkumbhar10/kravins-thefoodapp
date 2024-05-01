import React from 'react'
import Input from '../ui/Input'
import { UserInfoPropType } from '../UserInformation'


const UserInfoUpdateForm:React.FC<UserInfoPropType>= ({email, firstname, lastname, username}) => {


  return (
    <form
          className='m-auto flex flex-col justify-around md:justify-between items-center w-full h-full md:h-[27rem] transition-all duration-500' >
          <div className="w-full h-2/3 px-3 flex flex-col justify-start md:justify-between">
            <Input
              className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2`}
              label='First name' type='text' value={firstname}
              // {...register('firstname', { required: 'Firstname is required!' })}
            />
            {/* {errors.firstname && (<span className='text-red-500 text-xs px-3'>{errors.firstname.message}</span>)} */}
            <Input
              className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2`}
              label='Last Name' type='text' value={lastname}
              // {...register('lastname', { required: 'Lastname is required!' })}
            />
            {/* {errors.lastname && (<span className='text-red-500 text-xs px-3'>{errors.lastname.message}</span>)} */}
            <Input
              className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2}`}
              label='Email' type='email' value={email}
              // {...register('email', {
              //   required: 'Email is required!', pattern: {
              //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              //     message: 'Enter valid Email ID'
              //   }
              // })}
            />
            {/* {errors.email && (<span className='text-red-500 text-xs px-3'>{errors.email.message}</span>)} */}
            <Input
              className={`bg-transparent border-b border-gray-300 h-10 md:h-5 p-2 `}
              label='Choose Yummy Username' type='text' value={username}
              // {...register('username', { required: 'Username is required!' })}
            />
            {/* {errors.username && (<span className='text-red-500 text-xs px-3'>{errors.username.message}</span>)} */}
           
          </div>
          <button
            type='submit'
            className=' md:mt-4 py- text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-3xl md:rounded-lg px-8 w-3/4 md:w-full'
          >
            Update
          </button>
        </form>
  )
}

export default UserInfoUpdateForm