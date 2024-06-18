import React from 'react'
import UserInfoUpdateForm from './forms/UserInfoUpdateForm'

export type UserInfoPropType = {
  _id: string,
  email: string,
  username: string,
  firstname: string,
  lastname: string,
}

export const UserInformation: React.FC<UserInfoPropType> = ({ _id, email, firstname, lastname, username }: UserInfoPropType) => {

  return (
    <>
      <div className='flex justify-around p-2 md:p-5 border rounded-lg border-gray-200 mb-5 w-60 md:w-[30rem]'>
        <div className='w-16 flex flex-col justify-center items-center'>
          <h2 className='text-lg md:text-xl font-bold text-tomato'>50</h2>
          <h2 className='text-base md:text-lg'>Friends</h2>
        </div>
        <div className='w-16 flex flex-col justify-center items-center'>
          <h2 className='text-lg md:text-xl font-bold text-tomato'>13</h2>
          <h2 className='text-base md:text-lg'>Posts</h2>
        </div>
      </div>
      <UserInfoUpdateForm _id={_id} email={email} firstname={firstname} lastname={lastname} username={username} />
    </>
  )
}

