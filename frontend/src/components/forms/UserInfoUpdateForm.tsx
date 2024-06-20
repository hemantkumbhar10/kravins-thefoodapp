import React, { useEffect } from 'react'
import Input from '../ui/Input'
import { UserInfoPropType } from '../UserInformation'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as updateUserInfoClient from '../../apis/myprofile.api';
import { useAppDispatch, useAppSelector } from '../../store/dispatchHooks';
import { getUserProfileData } from '../../store/userProfile-slice';
import { useAppContext } from '../../contexts/useAppContext';


const UserInfoUpdateForm: React.FC = () => {

  const { email, username, firstname, lastname } = useAppSelector(state => state.userprofile);

  const { register,reset, handleSubmit, formState: { errors } } = useForm<UserInfoPropType>({ defaultValues: { email, username, firstname, lastname }  });

  useEffect(()=>{
    if(email){
      reset({ email, username, firstname, lastname })
    }
  },[reset,email, username, firstname, lastname])

  const { showToast } = useAppContext();

  const dispatch = useAppDispatch();

  const mutation = useMutation(updateUserInfoClient.updateMyProfile, {
    onSuccess: () => {
      dispatch(getUserProfileData());
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  })


  return (
    <>{
      <form
      onSubmit={onSubmit}
      className='flex flex-col justify-around md:justify-between items-center h-full md:h-[27rem] transition-all duration-500 w-60 md:w-[30rem] '
    >
      <div className="w-full h-2/3 px-3 flex flex-col justify-start md:justify-between">
        <Input
          labelClassName='font-semibold'
          className={`bg-transparent border-b font-normal border-gray-300 h-10 md:h-auto p-2 ${errors.firstname && 'border-red-500'}`}
          label='First Name' type='text'
          {...register('firstname', { required: 'Firstname is required!' })}
        />
        {errors.firstname && (<span className='text-red-500 text-xs px-3'>{errors.firstname.message}</span>)}
        <Input
          labelClassName='font-semibold'
          className={`bg-transparent font-normal border-b border-gray-300 h-10 md:h-auto p-2`}
          label='Last Name' type='text'
          {...register('lastname', { required: 'Lastname is required!' })}
        />
        {errors.lastname && (<span className='text-red-500 text-xs px-3'>{errors.lastname.message}</span>)}
        <Input
          labelClassName='font-semibold'
          className={`bg-transparent font-normal border-b border-gray-300 h-10 md:h-auto p-2`}
          label='Email' type='email'
          {...register('email', {
            required: 'Email is required!', pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter valid Email ID'
            }
          })}
        />
        {errors.email && (<span className='text-red-500 text-xs px-3'>{errors.email.message}</span>)}
        <Input
          labelClassName='font-semibold'
          className={`bg-transparent font-normal border-b border-gray-300 h-10 md:h-auto p-2 `}
          label='Choose Yummy Username' type='text'
          {...register('username', { required: 'Username is required!' })}
        />
        {errors.username && (<span className='text-red-500 text-xs px-3'>{errors.username.message}</span>)}

      </div>
      <button
        // disabled={mutation.isLoading}
        type='submit'
        className='mt-4 text-md bg-tomato text-white p-2 font-bold hover:bg-tomato hover:opacity-90 rounded-3xl md:rounded-lg px-8 w-3/4 md:w-full'
      >
        {mutation.isLoading ? 'Updating' : 'Update'}
      </button>
    </form>
    }</>
  )
}

export default UserInfoUpdateForm